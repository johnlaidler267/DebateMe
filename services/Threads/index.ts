import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
import { MongoClient } from 'mongodb';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';
import axios from 'axios';

interface Data {
    userId: string,
    postId: string,
    username: string,
    title: string,
    content: string,
    date: Date
}

interface Post {
    userId: string,
    postId: string,
    title: string,
    content: string,
}

interface Posts {
    
}

const app: Express = express();
const port = process.env.PORT || 4006;
const DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";
let postDB: Posts = {};
let userDB = {};

let isUserLoggedIn = false;

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(DATABASE_URL);
        userDB = client.db("Users").collection('users');
        postDB = client.db("Posts").collection('posts');
    } catch (err) {
        console.log(err);
    }
}

await connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.post('/posts/create', async (req: Request, res: Response) => {
    const { userId, title, content }: { userId: string, title: string, content: string }  = req.body;
    if (userId == undefined || title == undefined || content == undefined) {
        res.status(400).send("Request data is incomplete");
    }

    const user = await userDB.findOne({ userId: userId });

    if (user) {
        const postId: string = uuidv4();
        const date: Date = new Date();
        const data: Data = { 
            userId: userId,
            postId: postId,
            username: user.username,
            title: title,
            content: content,
            date: new Date()
        };
        
        postDB.insertOne(data);

        await axios.post('http://localhost:4010/events', {
            type: 'PostCreated',
            data: data,
        }).catch((err) => console.log(err.message));

        res.status(201).send(data);
    } else {
        res.status(404).send(`User ${userId} not found`);
    }

});

app.get('/posts/all', async (req: Request, res: Response) => {
    const posts = await postDB.find().toArray().catch((err: Error) => {
        console.log(err.message);
    })
    res.status(200).send(posts);
});

app.get('/posts/get', async (req: Request, res: Response) => {
    const { postId } = req.query;

    if (postId == undefined || typeof postId !== "string") {
        res.status(400).send("Request data is incomplete");
    }
    
    const post: Post = await postDB.findOne({ postId: postId });

    if (post) {
        res.status(200).send(post);
    } else {
        res.status(404).send(`Post ${postId} not found`);
    }
});

app.put('/posts/update', async (req: Request, res: Response) => {
    const { userId, postId, title, content } : { userId: string, postId: string, title: string, content: string } = req.body;
    if (userId == undefined || postId == undefined || title == undefined || content == undefined) {
        res.status(400).send("Request data is incomplete");
    }

    const user = await userDB.findOne({ userId: userId });

    if (user) {
        const post: Post = await postDB.findOne({ postId: postId });

        if (post) {
            if (post.userId === user.userId) {
                const data: Data = { 
                    userId: userId,
                    postId: postId,
                    username: user.username,
                    title: title,
                    content: content,
                };
                
                postDB.updateOne(
                    { postId: postId },
                    { $set: {...data} },
                    { upsert: true }
                  );
                
                await axios.post('http://localhost:4010/events', {
                    type: 'PostUpdated',
                    data: data,
                }).catch((err) => console.log(err.message));
        
                res.status(201).send(data);
            } else {
                res.status(401).send("Access is denied due to invalid credentials");
            }
        } else {
            res.status(404).send(`Post ${postId} not found`);
        }
    } else {
        res.status(404).send(`User ${userId} not found`);
    }
});

app.delete('/posts/delete', async (req: Request, res: Response) => {
    const { userId, postId } : { userId: string, postId: string } = req.body;
    if (userId == undefined || postId == undefined) {
        res.status(400).send("Request data is incomplete");
    }

    const user = await userDB.findOne({ userId: userId });

    if (user) {
        const post: Post = await postDB.findOne({ postId: postId });
        
        if (post) {
            if (post.userId === user.userId) {
                const data: Data = { 
                    userId: userId,
                    postId: postId,
                    username: user.username,
                    title: post.title,
                    content: post.content,
                };
                
                postDB.deleteOne({ postId: postId });
        
                await axios.post('http://localhost:4010/events', {
                    type: 'PostDeleted',
                    data: data,
                }).catch((err) => console.log(err.message));
        
                const message = {
                    userId: userId,
                    postId: postId,
                    message: `Thread title "${post.title}" has been deleted successfully!`
                }

                res.status(201).send({ message });
            } else {
                res.status(401).send("Access is denied due to invalid credentials");
            }
        } else {
            res.status(404).send(`Post ${postId} not found`);
        }
    } else {
        res.status(404).send(`User ${userId} not found`);
    }
});

app.post('/events', (req: Request, res: Response) => {
  const { type }: { type: string } = req.body;
  console.log(type);
  if (type === "UserLoggedIn") {
      isUserLoggedIn = true;
      console.log("User is currently logged in");
  }
  res.send({type: type});
});

app.listen(port, () => {
  console.log('Listening on port 4006');
});
