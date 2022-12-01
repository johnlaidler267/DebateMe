"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4006;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const posts = {};
// const users: Users = {}
app.post('/posts/create', (req, res) => {
    const { userId, title, content } = req.body;
    const postId = (0, uuid_1.v4)();
    const data = {
        userId: userId,
        postId: postId,
        title: title,
        content: content,
    };
    axios_1.default.post('http://localhost:4010/events', {
        type: 'PostCreated',
        data: data,
    });
    res.status(201).send(data);
});
app.get('/posts/all', (req, res) => {
    res.status(200).send(posts);
});
app.get('/posts/get', (req, res) => {
    const { postId } = req.body;
    const post = posts[postId];
    res.status(200).send(post);
});
app.post('/events', (req, res) => {
    const { type } = req.body;
    res.send(type);
});
app.listen(port, () => {
    console.log('Listening on port 4006');
});
