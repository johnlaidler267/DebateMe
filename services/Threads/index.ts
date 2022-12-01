import express, { Express, Request, Response } from 'express';
import logger from 'morgan';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

interface Data {
  id: string,
  title: string
}

interface Post {
  id: string,
  title: string
}

interface Posts {
  [key: string]: Post
}

const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

const posts: Posts = {};

app.get('/posts', (req: Request, res: Response) => {
  res.send(posts);
});

app.post('/posts', async (req: Request, res: Response) => {
  const id = randomBytes(4).toString('hex');
  const { title }: { title: string } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post('http://eventbus:4010/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req: Request, res: Response) => {
  const { type, data }: { type: string, data: Data } = req.body;
  console.log(type);
  res.send(data);
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
