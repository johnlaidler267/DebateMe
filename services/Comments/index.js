import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

class Comment{
  userID
  parentID
  commentID
  content
  postID //for getting all comments 
  //parentType? Is this neccessary? 
}
app.post("/comments/create"), (req,res) => {
  //get params 
  //add to database 
  //send response
}

app.get("/comments/get"), (req, res) => {
  //doc says get by CommentID, probably should be by postID
  //get postID
  //get all comments with same postID from database
  //send response
}
app.post("/events", (req, res) => {
  console.log(req.body.type);
  res.send({});
});


app.listen(4001, () => {
    console.log('Listening on 4001');
  });