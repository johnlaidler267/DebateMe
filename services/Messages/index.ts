import 'dotenv/config';
import express, { Express, Request, Response } from "express";
import logger from 'morgan';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';

interface Message {
  messageId: string;
  senderId: string; 
  receiverId: string;
  content: string;
}

interface Messages {
  insertOne(data: Message): unknown;
  find(): unknown;
  findOne(arg0: {
    postId:
      | string
      | string[]
      | import("qs").ParsedQs
      | import("qs").ParsedQs[]
      | undefined;
  }): Message | PromiseLike<Message>;
  updateOne(
    arg0: { messageId: string },
    arg1: {
      $set: {
        senderId: string; 
        receiverId: string;
        content: string;
      };
    },
    arg2: { upsert: boolean }
  ): unknown;
  deleteOne(arg0: { messageId: string }): unknown;
}

const app: Express = express();
const port = process.env.PORT || 4003;
const DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";
let messageDB: Messages = [];

const connectDB = async () => {
  try {
      const client = await MongoClient.connect(DATABASE_URL);
      
      messageDB = client.db("Messages").collection('messages');
  } catch (err) {
      console.log(err);
  }
}

await connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.post('/messages/create', async (req, res) => {
  const { senderId, receiverId, content }: { senderId: string, receiverId: string, content: string } = req.body;
  if (senderId == undefined || receiverId == undefined || content == undefined) {
    res.status(400).send({ error: "Request data is incomplete" });
  } else {
    const responseUser = await axios.post('http://eventbus:4010/events', {
      port: port,
      name: 'message',
      type: 'userDataRequest',
      userId: senderId,
    }).catch((err) => console.log(err.message));
  
    const responseFriend = await axios.post('http://eventbus:4010/events', {
      port: port,
      name: 'message',
      type: 'userDataRequest',
      friendId: receiverId,
    }).catch((err) => console.log(err.message));
  
    const usersExist = await responseUser.data && responseFriend.data;
    
    if (!usersExist) {
      res.status(404).send({ error: "User not found" });
    } else {
        const messageId = uuidv4();
        const data = {
          messageId: messageId,
          senderId: senderId,
          senderIdUsername: responseUser.data.username,
          ReceiverIdUsername: responseFriend.data.username,
          receiverId: receiverId,
          content: content,
          date: new Date()
        }
  
        messageDB.insertOne(data);
        res.status(201).send(data);
      }
  }
});

app.get('/messages/all', async (req, res) => {
  const { userId, friendId }: { userId: string, friendId: string } = req.query;
  if (userId == undefined || friendId == undefined) {
    res.status(400).send({ error: "Request data is incomplete" });
  } else {
    const responseUser = await axios.post('http://eventbus:4010/events', {
      port: port,
      name: 'message',
      type: 'userDataRequest',
      userId: userId,
    }).catch((err) => console.log(err.message));
  
    const responseFriend = await axios.post('http://eventbus:4010/events', {
      port: port,
      name: 'message',
      type: 'userDataRequest',
      friendId: friendId,
    }).catch((err) => console.log(err.message));
  
    const usersExist = await responseUser.data && responseFriend.data;

    if (!usersExist) {
      res.status(404).send({ error: "User not found" });
    } else {
        const messages: Message = await messageDB.find({ 
          "senderId": { "$in": [userId, friendId] },
          "receiverId": { "$in": [userId, friendId] }
         }).toArray();
  
          res.status(200).send(messages);
        }
  }
});

app.get('/messages/get', async (req, res) => {
  const { messageId }: { messageId: string } = req.query;
  if (messageId == undefined) {
    res.status(400).send({ error: "Request data is incomplete" });
  } else {
    const message = messageDB.find({ messageId: messageId });

    if (!message) {
      res.status(404).send({ error: "message not found" });
    } else {
        res.status(200).send(message);
    }
  }
});

app.put('/messages/update', async (req, res) => {
  const { messageId, content }: { messageId: string, content: string } = req.body;
  if (messageId == undefined || content == undefined) {
    res.status(400).send({ error: "Request data is incomplete" });
  } else {
    const message = messageDB.find({ messageId: messageId });

    if (!message) {
      res.status(404).send({ error: "message not found" });
    } else {
        message.updateOne(
          { messageId: messageId },
          { $set: { content: content } },
          { upsert: true }
        );
        res.status(201).send(message);
    }
  }
});

app.put('/messages/delete', async (req, res) => {
  const { messageId }: { messageId: string } = req.body;
  if (messageId == undefined) {
    res.status(400).send({ error: "Request data is incomplete" });
  } else {
    const message = messageDB.find({ messageId: messageId });

    if (!message) {
      res.status(404).send({ error: "message not found" });
    } else {
        message.deleteOne({ messageId: messageId });
        res.status(200).send(message);
    }
  }
});


app.post('/events', (req, res) => {
  const { type } = req.body;
  console.log(type);
  res.send({ type: type });
});

app.listen(port, () => {
  console.log('Listening on 4003');
});