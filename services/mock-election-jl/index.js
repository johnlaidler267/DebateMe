import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { CommentsDatabase } from './Comments-db.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

class Comment {
  userID
  parentID
  commentID
  content
  postID //for getting all comments 
  //parentType? Is this neccessary? 
}

class ElectionServer {

  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors());
  }

  // Initialize all routes (endpoints) for the server
  async initRoutes() {
    const self = this
    this.app.post("/election/create"), (req, res) => {
      //get params 
      //add to database 
      //send responset
    }

    this.app.get("/comments/get"), (req, res) => {
      //doc says get by CommentID, probably should be by postID
      //get postID
      //get all comments with same postID from database
      //send response
    }

    this.app.post("/events", (req, res) => {
      console.log(req.body.type);
      res.send({});
    });
  }

  // Initialize the database connection
  async initDb() {
    this.db = new ElectionDatabase(this.dburl);
    await this.db.connect();
  }

  // Start the server
  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 4001;
    this.app.listen(port, () => {
      console.log(`Comment server started on ${port}`);
    });
  }

}

// Start the server
const server = new ElectionServer(process.env.DATABASE_URL);
server.start()