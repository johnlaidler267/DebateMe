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
  rejected //array of the content
  accepted //array of the connet
  postId
}

class Post {
  userId // string,
  postId // string,
  title // string,
  content // string,
}

class Comment{
  userId
  parentId
  commentId
  postId 
  content
  //parentType? Is this neccessary? 
}
class ModerationServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors())
  }
  async scanComment(content, userId, postId){
    rejected_words = ["hate", "crap", "noob", "insult"] //maybe phrases for added diffuculty? 
    let word_array = content.split(" "); //makes an array of words to check in the comment
    let acceptable = "accepted"; 
    for(let i = 0; i< word_array.length; i++){
        if(rejected_words.includes(word_array[i].toLowerCase())){
            acceptable = 'rejected';
        }
    }
    await axios.post('http://event-bus:4010/events', { //sends the CommentModerated event and data to the event bus. Call This without local host?
        type: 'moderated',
        data: {
          userId: userId,
          content: content,
          postId: postId,  //hmmmmmm
          status: acceptable         //values could either be "accepted" or "rejected"
        },
      });
      return 
  }
  async updateDatabase(userId, )
  async initRoutes(){
    const self = this;

    //do I need this? depends on trust distinction implemenation 
    app.get("/rejected/user", (req,res) => {
      //get UserID
      //retrieve there history
      //send rejectedComments, just number? or actual content? 
    });

    app.post("/events", async (req, res) => { //should only recieve events I care about
      let data = req.body.data
      let status = await scanComment(data.content, data.userId, data.postId ) //how do I know types
      await this.updateDatabase()
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