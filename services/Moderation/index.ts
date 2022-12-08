import express, {Express, Request, Response} from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { ModerationDatabase } from './Moderation-db'; 

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

interface userHistory{
  userID:string;
  rejected: string[];//array of the content
  accepted: string[]; //array of the connet
  postId: string;
}

interface Post {
  userId:string;
  postId:string;
  title:string;
  content:string;
}

interface Comment{
  userId:string
  parentId:string
  commentId:string
  postId:string
  content:string
  //parentType? Is this neccessary? 
}
class ModerationServer {
  app: Express;
  dburl: string;
  db!: ModerationDatabase;
  constructor(dburl: string) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors())
  }
  async scanComment(content:string, userId:string, postId:string){
    let rejected_words: string[] = ["hate", "crap", "noob", "insult"] //maybe phrases for added diffuculty? 
    let word_array: string[] = content.split(" "); //makes an array of words to check in the comment
    let acceptable:string = "accepted"; 
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
//async updateDatabase(userId, )
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
      let status = await this.scanComment(data.content, data.userId, data.postId ) //how do I know types
      //await this.updateDatabase()
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
    await axios.post("http://localhost:4010/subscribe", {
      port: 4005,
      name: "Moderation",
      events: ["commentCreated", "postCreated", "postUpdated"]
    });
    const port = process.env.PORT || 4005;
    this.app.listen(port, () => {
      console.log(`Moderation server started on ${port}`);
    });
  }
}
const server: ModerationServer = new ModerationServer(process.env.DATABASE_URL!);
server.start()