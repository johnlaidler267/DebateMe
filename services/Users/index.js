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
let userDB = [];

const connectDB = async () => {
  try {
      const client = await MongoClient.connect(DATABASE_URL);
      
      userDB = client.db("Users").collection('users');
  } catch (err) {
      console.log(err);
  }
}

await connectDB();

await axios.post("http://localhost:4010/subscribe", {
  port: port,
  name: "users",
  events: []
});

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.post('/users/register', async (req, res) => {
  const { username, password, email, age, gender, race, country, state, city } = req.body;
  if (username == undefined || password == undefined || email == undefined || age == undefined || gender == undefined || race == undefined || country == undefined || state == undefined || city == undefined) {
    res.status(400).send({ error: "Request data is incomplete" });
  }
  
  const user = await userDB.findOne({ username: username });

  if (user) {
    res.status(409).send({ error: "User already exists" });
  } else {
    const userId = uuidv4();
    const data = {
      userId: userId,
      username: username,
      password: password,
      email: email,
      age: age,
      gender: gender,
      race: race,
      country: country,
      state: state,
      city: city,
      DirectMessages: []
    };
    
    userDB.insertOne(data);
    res.status(201).send(data);
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  if (username == undefined || password == undefined) {
    res.status(400).send({ error: "Request data is incomplete" });
  };
  
  const user = await userDB.findOne({ username: username });

  if (!user) {
    res.status(404).send({ error: "User not found" });
  } else {
      if (user.password !== password) {
        res.status(401).send({ error: "Access is denied due to invalid credentials" });
      } else {
          if (user.hasOwnProperty('_id')) {
            delete user._id;
          }

          res.status(200).send(user);
      }
  }
});

  app.get('/users/get', async (req, res) => {
    const { userId } = req.query;
    if (userId == undefined) {
      res.status(400).send({ error: "Request data is incomplete" });
    }

    const user = await userDB.findOne({ userId: userId }).catch((err) => {
      console.log(err.message);
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  });

  app.get('/users/username/get', async (req, res) => {
    const { username } = req.query;
    if (username == undefined) {
      res.status(400).send({ error: "Request data is incomplete" });
    }

    const user = await userDB.findOne({ username: username }).catch((err) => {
      console.log(err.message);
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  });

app.put('/users/update', async (req, res) => {
  const { userId, username, password, email, age, gender, race, country, state, city } = req.body;
  if (username == undefined || password == undefined || email == undefined || age == undefined || gender == undefined || race == undefined || country == undefined || state == undefined || city == undefined) {

    res.status(400).send({ error: "Request data is incomplete" });
  }
  
  const CurrentUser = await userDB.findOne({ userId: userId });

  const NewUser = await userDB.findOne({ username: username });
  
  const data = {
    userId: userId,
    username: username,
    password: password,
    email: email,
    age: age,
    gender: gender,
    race: race,
    country: country,
    state: state,
    city: city,
  };

  if (CurrentUser) {
    if (NewUser) {
      if (CurrentUser.userId === NewUser.userId) {
        userDB.updateOne(
          { userId: userId },
          { $set: {...data} },
          { upsert: true }
        );
        res.status(201).send(data);
      } else {
        res.status(409).send({ error: "User already exists" });
      }
    } else {
        userDB.updateOne(
          { userId: userId },
          { $set: {...data} },
          { upsert: true }
        );
        res.status(201).send(data);
      }
    } else {
      res.status(404).send({ error: "User not found" });
  };
});

app.post('/events', async (req, res) => {
  const { type } = req.body;
  if (type === "userDataRequest") {
    const { userId } = req.body;
    const User = await userDB.findOne({ userId: userId }) || {};
    console.log(User);
    res.send(User);
  }
});

app.listen(port, () => {
  console.log('Listening on 4008');
});
