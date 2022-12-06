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

class TrustDistinctionServer {

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

    /* Get the trust score for a user */
    this.app.get("/user/trust/get", async (req, res) => {
      const { userID } = req.query
      const engagementScore = await self.db.getEngagement(userID)
      const reliabilityScore = await self.db.getReliability(userID)
      const score = calculateScore(engagementScore, reliabilityScore)
      res.status(200).send(JSON.stringify(score))
      //send to event bus
    });

    /* Respond to events from the event bus */
    this.app.post("/events", (req, res) => {
      const type = req.body.type
      const data = req.body.data
      if (type === "commentCreated" || type === "voteCreated" || type === "postCreated")
        updateEngagment(type, data)
      else if (type === "commentVoted" || type === "commentModerated")
        updateReliability(type, data)
      res.send({});
    });
  }

  /* Update the engagement score for a user */
  async updateEngagement(type) {
    const score = await self.db.getEngagement(userID)
    const userID = data.userID

    if (type === "postCreated") score += 1
    else if (type === "commentCreated") score += 0.5
    else score += 0.25

    await self.db.updateEngagement(userID, score)
  }

  /* Update the reliability score for a user */
  async updateReliability(type, data) {
    const score = await self.db.getReliability(userID)
    const userID = data.userID

    score += (type === "commentVoted") ? 1 : -1

    await self.db.updateReliability(userID, score)
  }

  /* Calculate the trust score for a user */
  calculateScore(engagementScore, reliabilityScore) {
    const score = engagementScore + (reliabilityScore * 0.7)
    return score
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
    const port = process.env.PORT || 4001;
    this.app.listen(port, () => {
      console.log(`Polling server started on ${port}`);
    });
  }
}

// Start the server
const server = new ElectionBreakdownServer(process.env.DATABASE_URL);
server.start()