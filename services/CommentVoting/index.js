import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { CommentsVoteDatabase } from './CommentsVote-db.js'; 

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
  commentID // string
  upvotes //array of user ID's
  downvotes //array of userID's 
}


class CommentVoteServer{
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors())
  }
  async initRoutes(){
    const self = this;

    this.app.post('/comments/vote', async (req,res) => {
       //get the CommentStoredVotes for this commentID 
      const options = req.query;
      let storedVotes = await self.db.getCommentVotes(options.commentID); //should only ever be 1 object for each commemtID
      console.log(storedVotes)
      if(storedVotes.length === 0 ){
        let upvotes = []
        let downvotes =[]
        if(options.vote.toLowerCase() === "up"){
          upvotes = [options.userID]
          downvotes = []
        }
        else if(options.vote.toLowerCase() === 'down'){
          upvotes = []
          downvotes = [options.userID]
        }
        else{
          //error handling, should this even be possible? 
        }
        const voteObj = await self.db.createCommentVote(options.commentID, upvotes, downvotes)
        res.status(200).send(JSON.stringify(voteObj)) //voteObj not sending right object? need to debug
      }
      else{
        storedVotes = storedVotes[0]
        let newUpvotes =storedVotes.upvotes
        let newDownvotes = storedVotes.downvotes
        if (storedVotes.upvotes.includes(options.userID)){
          if (options.vote.toLowerCase() === "down"){
            
              const index = storedVotes.upvotes.indexOf(options.userID);
              newUpvotes.splice(index,1)
              newDownvotes.push(options.userID)
          }
          else{
            res.status(200).send("No Changes");
            return
          }
        }
        else if (storedVotes.downvotes.includes(options.userID)){
          if(options.vote.toLowerCase() === 'up'){
          
            const index = storedVotes.downvotes.indexOf(options.userID)
            newUpvotes.push(options.userID)
            newDownvotes.splice(index,1)
            
          }
          else{
            res.status(200).send("No Changes");
            return
          }
        }
        else{
          if (options.vote.toLowerCase() === 'up'){
            newUpvotes.push(options.userID);
          }
          else{
            newDownvotes.push(options.userID);
          }
        }
        const voteObj = await self.db.updateVote(options.commentID, newUpvotes, newDownvotes);
        console.log(voteObj)
        res.status(200).send(JSON.stringify(voteObj)) //voteObj not sending right object? need to debug
      }

      
      //send to event bus
    });
    //get all comments for a given commentID
    this.app.get("/comments/getVotes" , async (req, res) => {
      const options = req.query;
      const storedVotes = await self.db.getCommentVotes(options.commentID);
      res.status(200).send(JSON.stringify(storedVotes))
      //send to event bus
    });
    this.app.post("/events", (req, res) => {
      console.log(req.body.type);
      res.send({});
    });
  }
  async initDb() {
    this.db = new CommentsVoteDatabase(this.dburl);
    await this.db.connect();
  }
  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 4002;
    this.app.listen(port, () => {
      console.log(`Comment Vote server started on ${port}`);
    });
  }

}



const server = new CommentVoteServer(process.env.DATABASE_URL);
server.start()


