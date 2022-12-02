import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 4008;
const DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : "";
let users = {};

const connectDB = async () => {
  try {
      const client = await MongoClient.connect(DATABASE_URL);
      
      users = await client.db("Users").collection('users');
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
  
  res.status(200).send(data);
});


app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;
  if (username == undefined || password == undefined) {
    res.status(400).send("Request data is incomplete");
  }

  const user = users.find(username);

  if (user == undefined) {
    res.status(404).send("User not found");
  }

  if (user.password !== password) {
    res.status(401).send("Access is denied due to invalid credentials");
  } else {
      await axios.post('http://localhost:4010/events', {
        type: 'UserLoggedIn',
        data: {
          username,
          password,
        }
      })
      res.status(200).send(data);
  }
});

app.post('/users/update', async (req, res) => {
  const { username, password } = req.body;
  //add to Mongo
  res.status(201).send({ 
    username: username,
    passowrd: password
  });
});


app.post('/events', (req, res) => {
  console.log(req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
