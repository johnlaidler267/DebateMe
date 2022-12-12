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
      const username: string = req.query.username as string
      const parentId: string = req.query.parentId as string
      const postId: string = req.query.postId as string
      const content: string = req.query.content as string
      const commentId: string = randomBytes(4).toString("hex");
      const comment = await self.db.createComment(username, userId, parentId, commentId, postId, content)
      await axios.post('http://localhost:4010/events', { 
      type: 'commentCreated',
      data: {
        username: username,
        userId: userId,
        commentId: commentId,
        postId: postId,
        parentId: parentId,
        content: content
     },
    });
    res.status(200).send(JSON.stringify(comment))
    });

    //get all comments for a given postID
    this.app.get("/comments/get" , async (req: Request, res: Response) => {
      const postId:string = req.query.postId as string
      const postComments = await self.db.getPostComments(postId)
      const sortedComments = await this.sortByVotes(postComments) // sorts coments by number of votes
      res.status(200).send(JSON.stringify(sortedComments))
    });
    
    //get all comments for a given user
    this.app.get("/comments/user", async (req: Request,res: Response) => {
      const userId:string = req.query.userId as string
      const userComments = await self.db.getUserComments(userId)
      res.status(200).send(JSON.stringify(userComments))
    });

    this.app.post("/events", (req, res) => {
      //for recieving moderation event
      let data =req.body.data
      if(data.status === "rejected"){
        this.db.deleteComment(data.commentId)
      }
    
      res.send({});
    });
  }

  async sortByVotes(commentList: any[]){
    let orderedArray = [];
    let numVotes = [];
    for( let i = 0; i< commentList.length; i++){
      let voteObj = await axios.get(`http://localhost:4002/comments/getVotes?commentId=${commentList[i].commentid}`)
      if (voteObj.data.length === 0){
        orderedArray.push(commentList[i]);
        numVotes.push(0);
      }
      else{
        console.log(commentList[i].commentid)
        let pushed = false
        let votes = voteObj.data[0].upvotes.length + voteObj.data[0].downvotes.length
        if(numVotes.length === 0){
          orderedArray.push(commentList[i]);
          numVotes.push(votes);
          continue;
        }
        for(let j = 0; j < numVotes.length; j++){
          if(votes >= numVotes[j]){
            orderedArray.splice(j, 0, commentList[i] )
            numVotes.splice(j, 0, votes);
            pushed = true
            break;
          }
        }
        if(!pushed){
          orderedArray.push(commentList[i]);
          numVotes.push(votes);
        }
      }
    }
    return orderedArray
  }

  async initDb() {
    this.db = new CommentsDatabase(this.dburl);
    await this.db.connect();
  }
  async start() {
    await this.initRoutes();
    await this.initDb();
    await axios.post("http://localhost:4010/subscribe", {
      port: 4001,
      name: "Comments",
      eventArray: ["commentModerated"]
    });
    const port = process.env.PORT || 4001;
    this.app.listen(port, () => {
      console.log(`Comment server started on ${port}`);
    });
  }
}



const server: CommentServer = new CommentServer(process.env.DATABASE_URL!);
server.start()