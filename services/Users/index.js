import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());


app.post('/login', async (req, res) => {

  await axios.post('http://localhost:4001/events', {
    type: 'UserLoggedIn',
    data: {
      username,
      password,
    },
  });

  res.status(200).send(data);
});

app.post('/register', async (req, res) => {

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
