import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

class CommentSingleVote{
  userID //string
  commentID //string
  vote//string Up or Down
}
class CommentStoredVotes{
  userIDs //array of strings
  commentID // string
  upvotes //int
  downvotes //int
}

app.post("/comments/vote"), (req, res) => {
  //get CommentSingleVote params
  //get the CommentStoredVotes for this commentID 
  //add CommentSingleVote to these
  //add back to database
  //respond
}

//should I do this by CommentID or just return an array with PostID?
app.get("comments/allVotes"), (req, res) => {
  //get CommentID 
  //retrieve info from database
  //send response 
}
app.post("/events", (req, res) => {
  console.log(req.body.type);
  res.send({});
});

app.listen(4002, () => {
    console.log('Listening on 4002');
  });