import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import axios from 'axios';
import { BreakdownDatabase } from './breakdown-db.js';

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

    // Get the breakdown for a given election
    this.app.get("/getBreakdown", async (req, res) => {
      const { electionID } = req.query
      const breakdown = await this.db.getBreakdown(electionID)
      res.status(200).send(JSON.stringify(breakdown))
    });

    // Respond to a voteCreated or postCreated event from the event bus
    this.app.post("/events", async (req, res) => {
      // req = the incoming request from the event bus
      const { type, data } = req.body;

      if (type === "voteCreated") { // update the existing election breakdown w/ the new vote
        const { electionID, userId, vote } = data;
        const response = await axios.post("http://localhost:4010/events", { // Get the user demographics (send request to User service via event-bus)
          type: "userDataRequest",
          userId: userId
        });
        const { race, gender, age } = response.data;
        const breakdown = await this.db.updateBreakdown(electionID, vote, race, age, gender);
        res.status(200).send(JSON.stringify(breakdown));
      }
      else if (type === "postCreated") {// create/push a blank election breakdown
        const { postId, candidate } = data;
        const electionID = postId;
        const breakdown = await this.db.createBreakdown(electionID, candidate[0], candidate[1])
        res.status(200).send(JSON.stringify(breakdown))
      }
      else
        res.status(400).send("Invalid event type");

      res.send(res.data);
    });
  }

  /* Initialize the database connection */
  async initDb() {
    this.db = new BreakdownDatabase(this.dburl)
    await this.db.connect();
  }

  /* Start the server */
  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 4002;
    await axios.post("http://localhost:4010/subscribe", {
      port: 4002,
      name: "VoteBreakdown",
      events: ["postCreated", "voteCreated"]
    });
    this.app.listen(port, () => {
      console.log(`Breakdown server started on ${port}`);
    });
  }
}

// Start the server
const server = new BreakdownServer(process.env.DATABASE_URL);
server.start()