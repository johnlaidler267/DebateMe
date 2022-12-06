import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { ModerationDatabase } from './Moderation-db.js'; 

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

class userHistory{
  userID
  rejectedComments //array of strings
  acceptedComments //array of strings
}
class ModerationServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors())
  }
  async scanComment(comment, id, postId){
    let word_array = comment.split(" "); //makes an array of words to check in the comment
    let acceptable = "accepted"; 
    for(let i = 0; i< word_array.length; i++){
        if(bad_words.includes(word_array[i].toLowerCase())){
            acceptable = 'rejected';
        }
    }
    await axios.post('http://localhost:4005/events', { //sends the CommentModerated event and data to the event bus. Call This without local host?
        type: 'CommentModerated',
        data: {
          id: id,
          content: comment,
          postId: postId,
          status: acceptable         //values could either be "accepted" or "rejected"
        },
      });
      //return something, or add to daatabase here? 
  }
  async initRoutes(){
    const self = this;


    app.get("/rejected/user", (req,res) => {
      //get UserID
      //retrieve there history
      //send rejectedComments, just number? or actual content? 
    });
    app.post("/events", (req, res) => { //should I just name this moderate instead and have event bus send to that? 
      if(req.body.type === "CommentCreated"){ //event bus calls this, am I only interested in CommentCreated event? Will everything that comes here be important? 
        let data = req.body.data
        scanComment(data.content, data.id, data.postId ) 
        //add to database
    }
      console.log(req.body.type);
      res.send({});
    });

  }

  async initDb() {
    this.db = new ModerationDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    await axios.post("http://event-bus:4010/subscribe", {
      port: 4005,
      events: ["commentCreated", "postCreated", "postUpdated"]
    });
    const port = process.env.PORT || 4005;
    this.app.listen(port, () => {
      console.log(`Comment server started on ${port}`);
    });
  }
}
const server = new ModerationServer(process.env.DATABASE_URL);
server.start()