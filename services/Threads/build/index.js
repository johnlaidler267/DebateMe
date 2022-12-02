import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import axios from 'axios';
const app = express();
const port = process.env.PORT || 4006;
const DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";
let posts = {};
let users = {};
const connectDB = async () => {
    try {
        const client = await MongoClient.connect(DATABASE_URL);
        users = await client.db("Users").collection('users');
        console.log(client);
        console.log(users);
        // posts = await client.db("Posts").collection('posts');
    }
    catch (err) {
        console.log(err);
    }
};
await connectDB();
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.post('/posts/create', async (req, res) => {
    const { userId, title, content } = req.body;
    if (userId == undefined || title == undefined || content == undefined) {
        res.status(400).send("Request data is incomplete");
    }
    const postId = uuidv4();
    const data = {
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
app.get('/posts/all', (req, res) => {
    res.status(200).send(posts);
});
app.get('/posts/get', (req, res) => {
    const { postId } = req.body;
    if (postId == undefined) {
        res.status(400).send("Request data is incomplete");
    }
    const post = posts[postId];
    if (post == undefined) {
        res.status(404).send(`Post ${postId} not found`);
    }
    else {
        res.status(200).send(post);
    }
});
app.put('/posts/update', (req, res) => {
    const { userId, postId, title, content } = req.body;
    if (userId == undefined || title == undefined || content == undefined) {
        res.status(400).send("Request data is incomplete");
    }
    const post = posts[postId];
    if (post == undefined) {
        res.status(404).send(`Post ${postId} not found`);
    }
    // if (userId not exist || post.userId !== userId) {
    //     res.status(401).send(`Access is denied due to invalid credentials.`);
    // }
    // mongo Update
    res.status(200).send(post);
});
app.post('/events', (req, res) => {
    const { type } = req.body;
    console.log(type);
    res.send({ type: type });
});
app.listen(port, () => {
    console.log('Listening on port 4006');
});
