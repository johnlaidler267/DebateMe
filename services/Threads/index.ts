import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
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

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

const posts: Posts = {};
// const users: Users = {}

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
    const post: Post = posts[postId];
    res.status(200).send(post);
});

app.post('/events', (req: Request, res: Response) => {
  const { type }: { type: string } = req.body;
  res.send(type);
});

app.listen(port, () => {
  console.log('Listening on port 4006');
});
