import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { TrustDatabase } from './trust-db.js';
import { threadId } from 'worker_threads';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

class ElectionBreakdownServer {

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

    this.app.post("/user/trust/update"), async (req, res) => {
      const req = req.query;
      const vote = await self.db.updateScore(req.userID, req.debates, req.comments, req.upvoteRatio, req.upvotes, req.dowbvotes, req.flags)
      res.status(200).send(JSON.stringify(vote))
      //send to event bus
    }

    this.app.get("/user/trust/get", async (req, res) => {
      const { userID } = req.query
      const score = await self.db.getScore(userID)
      res.status(200).send(JSON.stringify(score))
      //send to event bus
    });

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
      console.log(`Polling server started on ${port}`);
    });
  }
}

// Start the server
const server = new ElectionBreakdownServer(process.env.DATABASE_URL);
server.start()