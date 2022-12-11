import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import { MongoClient } from 'mongodb';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4003;
const DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";
let userDB = [];
let messageDB = [];

let isUserLoggedIn = false;

const connectDB = async () => {
  try {
      const client = await MongoClient.connect(DATABASE_URL);
      
      userDB = client.db("Users").collection('users');
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
  const { senderId, receiverId, content } = req.body;
  if (senderId == undefined || receiverId == undefined || content == undefined) {
    res.status(400).send("Request data is incomplete");
  }
  
  const usersExist = await userDB.findOne({ userId: senderId }) && await userDB.findOne({ userId: receiverId });
  
  if (!usersExist) {
    res.status(404).send("User Not Found");
  } else {
      const messageId = uuidv4();
      const data = {
        messageId: messageId,
        senderId: senderId,
        receiverId: receiverId,
        content: content,
      }

      messageDB.insertOne(data);
      res.status(201).send(data);
    }
});

app.get('/messages/all', async (req, res) => {
  const { userId, friendId } = req.body;
  if (userId == undefined || friendId == undefined) {
    res.status(400).send("Request data is incomplete");
  };
  
  const usersExist = await userDB.findOne({ userId: userId }) && await userDB.findOne({ userId: friendId });

  if (!usersExist) {
    res.status(404).send(`User not found`);
  } else {
      const messages = await messageDB.find({ 
        "senderId": { "$in": [userId, friendId] },
        "receiverId": { "$in": [userId, friendId] }
       }).toArray();

        res.status(200).send(messages);
      }
});

app.post('/events', (req, res) => {
  const { type } = req.body;
  console.log(type);
  if (type === "UserLoggedIn") {
    isUserLoggedIn = true;
    console.log("User is currently logged in");
  }
  res.send({ type: type });
});

app.listen(port, () => {
  console.log('Listening on 4003');
});