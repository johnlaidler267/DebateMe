import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import { MongoClient } from 'mongodb';
import {v4 as uuidv4} from 'uuid';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 4008;
const DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";
let users = {};

const connectDB = async () => {
  try {
      const client = await MongoClient.connect(DATABASE_URL);
      
      users = client.db("Users").collection('users');
  } catch (err) {
      console.log(err);
  }
}

await connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.post('/users/register', async (req, res) => {
  const { username, name, password, email, age, race } = req.body;
  if (username == undefined || name == undefined || password == undefined || email == undefined || age == undefined || race == undefined) {
    res.status(400).send("Request data is incomplete");
  }
  
  const user = await users.findOne({ username: username });
  const userId = uuidv4();
  const data = {
    userId: userId,
    username: username,
    name: name,
    password: password,
    email: email,
    age: age,
    race: race,
    DirectMessages: []
  }

  if (user) {
    res.status(409).send("User already exists");
  } else {
    users.insertOne(data);
    res.status(201).send(data);
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  if (username == undefined || password == undefined) {
    res.status(400).send("Request data is incomplete");
  };
  
  const user = await users.findOne({ username: username });

  if (!user) {
    res.status(404).send("User not found");
  } else {
      if (user.password !== password) {
        res.status(401).send("Access is denied due to invalid credentials");
      } else {
          await axios.post('http://localhost:4010/events', {
            type: 'UserLoggedIn',
            data: user
          }).catch((err) => console.log(err.message));

          res.status(200).send(user);
      }
  }
});

app.put('/users/update', async (req, res) => {
  const { userId, username, name, password, email, age, race } = req.body;
  if (username == undefined || name == undefined || password == undefined || email == undefined || age == undefined || race == undefined) {
    res.status(400).send("Request data is incomplete");
  }
  
  const user = await users.findOne({ userId: userId });

  const UserExist = await users.findOne({ username: username });
  
  const data = { 
    username: username,
    name: name,
    password: password,
    email: email,
    age: age,
    race: race
  };

  if (user) {
    if (!UserExist) {
        res.status(409).send("User already exists");
    } else {
        users.updateOne(
          { userId: userId },
          { $set: {...data} },
          { upsert: true }
        );
        res.status(201).send(data);
      }
    } else {
      res.status(404).send("User not found");
  };
});



app.post('/events', (req, res) => {
  const { type } = req.body;
  console.log(type);
  res.send({ type: type });
});

app.listen(port, () => {
  console.log('Listening on 4008');
});
