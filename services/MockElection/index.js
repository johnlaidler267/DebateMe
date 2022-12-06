import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { ElectionDatabase } from './election-db.js';
import { threadId } from 'worker_threads';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

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

    /* Creates a new vote */
    this.app.post("/vote/cast"), async (req, res) => {
      const { vote, electionID, userID } = req.query;
      const Vote = await self.db.createVote(vote, electionID, userID)
      res.status(200).send(JSON.stringify(Vote))
      //send to event bus
    }
  }

  /* Initialize the database connection */
  async initDb() {
    this.db = new ElectionDatabase(this.dburl);
    await this.db.connect();
  }

  /* Start the server */
  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 4004;
    this.app.listen(port, () => {
      console.log(`Election server started on ${port}`);
    });
  }
}

/* Start the server */
const server = new ElectionServer(process.env.DATABASE_URL);
server.start()