import express from 'express';
import logger from 'morgan';
import axios from 'axios';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.post('/events', (req, res) => {
  const event = req.body;
  //make subscriptable here, need to check type of incoming event and send it only to services that care about that event. 

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err.message);
  });
  
  axios.post('http://localhost:4004/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4005/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4006/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4007/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:4008/events', event).catch((err) => {
    console.log(err.message);
  });

  console.log(event.type);
  res.send();
});

app.listen(4010, () => {
  console.log('Listening on 4010');
});
