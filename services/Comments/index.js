import express, { response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { CommentsDatabase } from './Comments-db.js'; 

const app = express();

class Comment{
  userID
  parentID
  commentID
  postID 
  content
  //parentType? Is this neccessary? 
}
class CommentServer{
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors())
  }
  async initRoutes(){
    const self = this;

    this.app.post('/addComment', async (req,res) => {
      const options = req.query
      const comment = await self.db.createComment(options.userID, options.parentID, options.commentID, options.postID, options.content)
      res.status(200).send(JSON.stringify(comment))
    });
    //get all comments for a given postID
    this.app.get("/comments/get" , async (req, res) => {
      //doc says get by CommentID, probably should be by postID
      const options = req.query
      const postComments = await self.db.getPostComments(options.postID)
      res.status(200).send(JSON.stringify(postComments))
    });
    this.app.post("/events", (req, res) => {
      console.log(req.body.type);
      res.send({});
    });
  }
  async initDb() {
    this.db = new CommentsDatabase(this.dburl);
    await this.db.connect();
  }
  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 4001;
    this.app.listen(port, () => {
      console.log(`Comment server started on ${port}`);
    });
  }
}



const server = new CommentServer(process.env.DATABASE_URL);
server.start()