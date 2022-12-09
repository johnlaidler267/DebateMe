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
    const self = this

    // Get the breakdown for a given election
    this.app.get("/breakdown/get", async (req, res) => {
      const { electionID } = req.query
      const breakdown = await self.db.getBreakdown(electionID)
      res.status(200).send(JSON.stringify(breakdown))
    });

    // Get the breakdown for a given election - FOR TESTING PURPOSES
    this.app.get("/test/add/breakdown", async (req, res) => {
      const { electionID } = req.body.data
      const breakdown = await self.db.updateBreakdown(electionID)
      res.status(200).send(JSON.stringify(breakdown))
    });

    // Respond to a voteCreated or postCreated event from the event bus
    this.app.get("/events", async (req, res) => {
      // req = the incoming request from the event bus
      const { type, data } = req.body;

      if (type === "voteCreated") {

        // Get the users demographics by sending a request to the user service through the event bus
        const response = await axios.post("http://localhost:4010/events", {
          type: "userDataRequest",
          userId: data.userId
        });
        const { race, gender, age } = response.data;

        const breakdown = await self.db.updateBreakdown(data.electionId, data.vote, race, age, gender);
        res.status(200).send(JSON.stringify(breakdown));
      }
      else { // type === "postCreated"
        const electionID = data.postId;
        const cand0 = data.candidate[0];
        const cand1 = data.candidate[1];

        const breakdown = await self.db.createBreakdown(electionID, cand0, cand1)
        res.status(200).send(JSON.stringify(breakdown))
      }
      console.log(response.data)
      res.send(response.data);
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
    //   events: ["postCreated", "voteCreated"]
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