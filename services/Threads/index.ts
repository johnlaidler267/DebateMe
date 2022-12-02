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
    title: string,
    content: string,
}

interface Post {
    userId: string,
    postId: string,
    title: string,
    content: string,
}

interface Posts {
  [key: string]: Post
}

const app: Express = express();
const port = process.env.PORT || 4006;
const DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";
let posts: Posts = {};
let users = {};

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(DATABASE_URL);
        
        users = client.db("Users").collection('users');
        // posts = await client.db("Posts").collection('posts');
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
    const postId: string = uuidv4();
    const data: Data = { 
        userId: userId,
        postId: postId,
        title: title,
        content: content,
    };

    // mongo insert post

    await axios.post('http://localhost:4010/events', {
        type: 'PostCreated',
        data: data,
    }).catch((err) => console.log(err.message));

    res.status(201).send(data);
});

app.get('/posts/all', (req: Request, res: Response) => {
    res.status(200).send(posts);
});

app.get('/posts/get', (req: Request, res: Response) => {
    const { postId } : { postId: string } = req.body;
    if (postId == undefined) {
        res.status(400).send("Request data is incomplete");
    }
    const post: Post = posts[postId];
    if (post == undefined) {
        res.status(404).send(`Post ${postId} not found`);
    } else {
        res.status(200).send(post);
    }
});

app.put('/posts/update', (req: Request, res: Response) => {
    const { userId, postId, title, content } : { userId: string, postId: string, title: string, content: string } = req.body;
    if (userId == undefined || title == undefined || content == undefined) {
        res.status(400).send("Request data is incomplete");
    }
    const post: Post = posts[postId];

    if (post == undefined) {
        res.status(404).send(`Post ${postId} not found`);
    }

    // if (userId not exist || post.userId !== userId) {
    //     res.status(401).send(`Access is denied due to invalid credentials`);
    // }

    // mongo Update

    res.status(200).send(post);
})

app.post('/events', (req: Request, res: Response) => {
  const { type }: { type: string } = req.body;
  console.log(type);
  res.send({type: type});
});

app.listen(port, () => {
  console.log('Listening on port 4006');
});
