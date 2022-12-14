import express, { Express, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import axios from "axios";
import { TrustDatabase } from "./trust-db";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

class TrustServer {
  app: Express;
  dburl: string;
  db: any;

  constructor(dburl: string) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(cors());
  }

  /* Initialize all routes (endpoints) for the server - i.e. things other services can connect to */
  async initRoutes() {
    /* Update score when an event is recieved from the event bus */
    this.app.post("/events", async (req, res) => {
      console.log(req.body);
      const type = req.body.type;
      const body = req.body.data;

      console.log("TrustServer Event Recieved From EventBus::", type, body);

      if (
        type === "commentCreated" ||
        type === "voteCreated" ||
        type === "postCreated"
      ) {
        const username = body.username;
        console.log("updating enagement");
        await this.updateEngagement(type, username);
      } else if (type === "commentVoted" || type === "commentModerated") {
        const userID = body.userId;
        console.log("updating reliability", userID);
        await this.updateReliability(type, userID);
      } else if (type === "userCreated") {
        const userID = body.userID;
        console.log("initializing user", userID);
        await this.db.initializeUser(userID);
      } else console.log("Invalid event type recieved");

      res.send({});
    });

    /* Get the trust score for a user */
    this.app.get("/getTrust", async (req, res) => {
      const userID = req.query.userId;
      console.log("recived this query in trust", userID);
      const engagementScore = await this.db.getEngagement(userID);
      const reliabilityScore = await this.db.getReliability(userID);
      const score = this.calculateScore(engagementScore, reliabilityScore);
      res.status(200).send(JSON.stringify(score));
    });
  }

  /* Update the engagement score for a user */
  async updateEngagement(type: string, userID: string) {
    console.log("INSIDE ENGAGEMENT UPDATE", type, userID);
    let score = await this.db.getEngagement(userID);

    if (type === "postCreated") score += 1;
    else if (type === "commentCreated") score += 0.5;
    else score += 0.25;

    await this.db.updateEngagement(userID, score);
  }

  /* Update the reliability score for a user */
  async updateReliability(type: string, userID: any) {
    let score = await this.db.getReliability(userID);
    score += type === "commentVoted" ? 1 : -1;
    await this.db.updateReliability(userID, score);
  }

  /* Calculate the trust score for a user */
  calculateScore(engagementScore: number, reliabilityScore: number) {
    return (engagementScore + reliabilityScore * 0.7) * 1000;
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
      port: 4007,
      name: "trust",
      eventArray: ["userCreated", "voteCreated", "commentCreated"],
    });
    const port = process.env.PORT || 4007;
    this.app.listen(port, () => {
      console.log(`Trust server started on ${port}`);
    });
  }
}

// Start the server
const server = new TrustServer(process.env.DATABASE_URL!);
server.start();
