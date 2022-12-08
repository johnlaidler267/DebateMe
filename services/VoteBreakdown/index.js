import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { BreakdownDatabase } from './breakdown-db.js';
import { threadId } from 'worker_threads';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

class BreakdownServer {

  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors());
  }

  /* Initialize all routes (endpoints) for the server */
  async initRoutes() {
    const self = this

    // Get the breakdown for a given election
    this.app.get("/breakdown/get", async (req, res) => {
      const { electionID } = req.query
      const breakdown = await self.db.getBreakdown(electionID)
      res.status(200).send(JSON.stringify(breakdown))
    });

    // Get the breakdown for a given election
    this.app.get("/test/add/breakdown", async (req, res) => {
      const { electionID } = req.body.data
      const breakdown = await self.db.updateBreakdown(electionID)
      res.status(200).send(JSON.stringify(breakdown))
    });

    // Respond to a voteCreated event from the event bus
    this.app.get("/events", async (req, res) => {
      const vote = req.body.data

      const { age, race, gender } = await axios.post("http://localhost:4010/events", {
        params: {
          userID: data.userID
        },
        body: {
          type: "userDataRequest"
        }
      });

      const update = await self.db.updateBreakdown(vote, userData)
      res.status(200).send(JSON.stringify(update))
    });
  }

  /* Initialize the database connection */
  async initDb() {
    this.db = new BreakdownDatabase(this.dburl);
    await this.db.connect();
  }

  /* Start the server */
  async start() {
    await this.initRoutes();
    await this.initDb();
    // await axios.post("http://localhost:4010/subscribe", {
    //   port: 4005,
    //   name: "VoteBreakdown",
    //   events: []
    // });
    const port = process.env.PORT || 4002;
    this.app.listen(port, () => {
      console.log(`Polling server started on ${port}`);
    });
  }
}

// Start the server
const server = new BreakdownServer(process.env.DATABASE_URL);
server.start()