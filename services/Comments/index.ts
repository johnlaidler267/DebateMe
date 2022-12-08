import  express, {Express, Request, Response} from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { CommentsDatabase } from './Comments-db'; 
import { randomBytes } from "crypto";


interface Comment{
  userId:  string
  parentId: string
  commentId: string
  postId: string
  content:string 
  //parentType? Is this neccessary? 
}

class CommentServer{
  app: Express
  dburl: string
  db!: CommentsDatabase
  constructor(dburl:string) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors())
  }
  async initRoutes(){
    const self = this;

    this.app.post('/addComment', async (req: Request,res: Response) => {
      const userId: string = req.query.userId as string
      const parentId: string = req.query.parentId as string
      const postId: string = req.query.postId as string
      const content: string = req.query.content as string
      const commentId: string = randomBytes(4).toString("hex");
      const comment = await self.db.createComment(userId, parentId, commentId, postId, content)
      res.status(200).send(JSON.stringify(comment))
      await axios.post('http://event-bus:4010/events', { 
      type: 'commentCreated',
      data: {
        userId: userId,
        commentId: commentId,
        postId: postId,
        parentId: parentId,
        content: content
     },
    });
    });

    //get all comments for a given postID
    this.app.get("/comments/get" , async (req: Request, res: Response) => {
      const postId:string = req.query.postId as string
      const postComments = await self.db.getPostComments(postId)
      res.status(200).send(JSON.stringify(postComments))
    });
    
    //get all comments for a given user
    this.app.get("/comments/user", async (req: Request,res: Response) => {
      const userId:string = req.query.userId as string
      const userComments = await self.db.getUserComments(userId)
      res.status(200).send(JSON.stringify(userComments))
    });

    this.app.post("/events", (req, res) => {
      //what do I respond to in here? will getting user comments? Threading maybe and coloring? 
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



const server: CommentServer = new CommentServer(process.env.DATABASE_URL!);
server.start()