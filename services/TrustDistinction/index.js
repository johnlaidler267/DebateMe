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

class TrustServer {

  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(cors());
  }

  /* Initialize all routes (endpoints) for the server - i.e. things other services can connect to */
  async initRoutes() {
    /* Update score when an event is recieved from the event bus */
    this.app.post("/events", async (req, res) => {
      console.log(req.body)
      const type = req.body.type
      const userID = req.body.data.userID

      console.log("TrustServer Event Recieved From EventBus::", type, userID)

      if (type === "commentCreated" || type === "voteCreated" || type === "postCreated")
        await this.updateEngagement(type, userID)
      else if (type === "commentVoted" || type === "commentModerated")
        await this.updateReliability(type, userID)
      else if (type === "userCreated") {
        console.log("initializing user")
        await this.db.initializeUser(userID)
      }
      else
        console.log("Invalid event type recieved")

      res.send({});
    });

    /* Get the trust score for a user */
    this.app.get("/getTrust", async (req, res) => {
      const { userID } = req.query
      const engagementScore = await this.db.getEngagement(userID)
      const reliabilityScore = await this.db.getReliability(userID)
      const score = this.calculateScore(engagementScore, reliabilityScore)
      res.status(200).send(JSON.stringify(score))
    });
  }

  /* Update the engagement score for a user */
  async updateEngagement(type, userID) {
    let score = await this.db.getEngagement(userID)

    if (type === "postCreated") score += 1
    else if (type === "commentCreated") score += 0.5
    else score += 0.25

    await this.db.updateEngagement(userID, score)
  }

  /* Update the reliability score for a user */
  async updateReliability(type, userID) {
    let score = await this.db.getReliability(userID);
    score += (type === "commentVoted") ? 1 : -1
    await this.db.updateReliability(userID, score)
  }

  /* Calculate the trust score for a user */
  calculateScore(engagementScore, reliabilityScore) {
    return (engagementScore + (reliabilityScore * 0.7)) * 1000
  }

  /* Initialize the database connection */
  async initDb() {
    this.db = new TrustDatabase(this.dburl);
    await this.db.connect();
  }

  /* Start the server */
  async start() {
    await this.initRoutes();
    await this.initDb();
    await axios.post("http://localhost:4010/subscribe", {
      port: 4008,
      name: "trust",
      events: ["userCreated", "voteCreated"]
    });
    const port = process.env.PORT || 4008;
    this.app.listen(port, () => {
      console.log(`Trust server started on ${port}`);
    });
  }
}

// Start the server
const server = new TrustServer(process.env.DATABASE_URL);
server.start()