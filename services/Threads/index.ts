import "dotenv/config";
import express, { Express, Request, Response } from "express";
import logger from "morgan";
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import axios from "axios";

interface Data {
  userId: string;
  postId: string;
  username: string;
  title: string;
  content: string;
  candidate: string[];
  date: Date;
}

interface Post {
  userId: string;
  postId: string;
  title: string;
  content: string;
}

interface Posts {}

const app: Express = express();
const port = process.env.PORT || 4006;
const DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";
let postDB: Posts = {};

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(DATABASE_URL);
        postDB = client.db("Posts").collection('posts');
    } catch (err) { 
        console.log(err);
    }
}

await connectDB();

// await axios.post("http://localhost:4010/subscribe", {
//   port: port,
//   name: "threads",
//   events: ["userDataRequest"]
// });

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.post('/posts/create', async (req: Request, res: Response) => {
    const { userId, username, title, content, candidate }: { userId: string, username: string, title: string, content: string, candidate: string[] }  = req.body;
    if (userId == undefined || title == undefined || content == undefined || candidate == undefined) {
        res.status(400).send({ error: "Request data is incomplete" });
    } else {
        const postId: string = uuidv4();
        const data: Data = { 
            userId: userId,
            postId: postId,
            username: username,
            title: title,
            content: content,
            candidate: candidate,
            date: new Date()
        };
    
        await axios.post('http://localhost:4010/events', {
            type: 'postCreated',
            data: data,
        }).catch((err) => console.log(err.message));
    
        postDB.insertOne(data);

        res.status(201).send(data);
    }

    postDB.insertOne(data);

    await axios
      .post("http://localhost:4010/events", {
        type: "PostCreated",
        data: data,
      })
      .catch((err) => console.log(err.message));

    res.status(201).send(data);
});

app.get("/posts/all", async (req: Request, res: Response) => {
  const posts = await postDB
    .find()
    .toArray()
    .catch((err: Error) => {
      console.log(err.message);
    });
  res.status(200).send(posts);
});

app.get("/posts/get", async (req: Request, res: Response) => {
  const { postId } = req.query;

  if (postId == undefined || typeof postId !== "string") {
    res.status(400).send({ error: "Request data is incomplete" });
  }

  const post: Post = await postDB.findOne({ postId: postId });

  if (post) {
    res.status(200).send(post);
  } else {
    res.status(404).send({ error: "Post not found" });
  }
});


app.put('/posts/update', async (req: Request, res: Response) => {
    const { userId, postId, title, content, candidate } : { userId: string, postId: string, title: string, content: string, candidate: string[] } = req.body;
    console.log(userId, postId, title, content, candidate)
    if (userId == undefined || postId == undefined || title == undefined || content == undefined || candidate == undefined) {
        res.status(400).send({ error: "Request data is incomplete" });
    } else {
        const response = await axios.post('http://localhost:4010/events', {
            port: port,
            name: 'thread',
            type: 'userDataRequest',
            userId: userId,
        }).catch((err) => console.log(err.message)); 

        const user = await response.data;

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
                        type: 'postUpdated',
                        data: data,
                    }).catch((err) => console.log(err.message));
            
                    res.status(201).send(data);
                } else {
                    res.status(401).send({ error: "Access is denied due to invalid credentials" });
                }
            } else {
                res.status(404).send({ error: "Post not found" });
            }
        } else {
            res.status(404).send({ error: "User not found" });
        }
    }
});

app.delete('/posts/delete', async (req: Request, res: Response) => {
    const { userId, postId } : { userId: string, postId: string } = req.body;
    console.log(req);
    console.log(req.body);
    if (userId == undefined || postId == undefined) {
        res.status(400).send({ error: "Request data is incomplete" });
    }

    const response = await axios.post('http://localhost:4010/events', {
        port: port,
        name: 'thread',
        type: 'userDataRequest',
        userId: userId,
    }).catch((err) => console.log(err.message)); 

    const user = await response.data;

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
                    type: 'postDeleted',
                    data: data,
                }).catch((err) => console.log(err.message));
        
                const message = {
                    userId: userId,
                    postId: postId,
                    message: `Thread title "${post.title}" has been deleted successfully!`
                }

                res.status(201).send({ message });
            } else {
                res.status(401).send({ error: "Access is denied due to invalid credentials" });
            }
        } else {
            res.status(404).send({ error: "Post not found" });
        }
    } else {
        res.status(404).send({ error: "User not found" });
    }
});

app.post('/events', (req: Request, res: Response) => {
  const { type }: { type: string } = req.body;
  console.log(type);
  res.send({ type: type });
});

app.listen(port, () => {
  console.log("Listening on port 4006");
});
