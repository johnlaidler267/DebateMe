import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

class userHistory{
  userID
  rejectedComments //array of strings
  acceptedComments //array of strings
}

app.post("/moderate"), (req, res) => {
  //get content to moderate
  //break it into words, maybe phrases? 
  //check all words against list, basic normilzations(case)
  //should I worry about checking for slight changes? such as making an I into a 1 or e into 3
  //are comments and posts any different? 
  //add result to database by userID, array of resuls
  //send response
}

app.get("/rejected/user") , (req,res) => {
  //get UserID
  //retrieve there history
  //send rejectedComments, just number? or actual content? 
}
app.post("/events", (req, res) => {
  console.log(req.body.type);
  res.send({});
});

app.listen(4005, () => {
    console.log('Listening on 4005');
  });