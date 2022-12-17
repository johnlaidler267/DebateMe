import express, { Express, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import axios from "axios";
import { BreakdownDatabase } from "./breakdown-db";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

class BreakdownServer {
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

  /* Initialize all routes (endpoints) for the server */
  async initRoutes() {
    // Get the breakdown for a given election
    this.app.get("/getBreakdown", async (req: Request, res: Response) => {
      const electionID = req.query.electionID as string;
      const breakdown = await this.db.getBreakdown(electionID);
      res.status(200).send(JSON.stringify(breakdown));
    });

    // Respond to a voteCreated or postCreated event from the event bus
    this.app.post("/events", async (req: Request, res: Response) => {
      // req = the incoming request from the event bus
      const { type, data } = req.body;

      if (type === "voteCreated") {
        // update the existing election breakdown w/ the new vote
        const { electionID, userID, vote } = data;

        if (!electionID || !userID || !vote)
          res.status(400).send("Invalid request");
        if (!(await this.db.containsElection(electionID)))
          res.status(404).send("Election not found");

        const response = await axios
          .post("http://eventbus:4010/events", {
            // Get the user demographics (send request to User service via event-bus)
            type: "userDataRequest",
            userId: userID,
          })
          .catch((err: any) => {
            res.status(500).send("Error getting user data");
          });

        const { race, gender, age } = response.data;

        const breakdown = await this.db.updateBreakdown(
          electionID,
          vote,
          race,
          age,
          gender
        );
        res.status(200).send(JSON.stringify(breakdown));
      } else if (type === "postCreated") {
        const { postId, candidate } = data;
        if (!candidate || !postId) res.status(400).send("Invalid request");
        const electionID = postId;
        const breakdown = await this.db.createBreakdown(
          electionID,
          candidate[0],
          candidate[1]
        );
        res.status(200).send(JSON.stringify(breakdown));
      }
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
    const port = process.env.PORT || 4009;
    await axios.post("http://eventbus:4010/subscribe", {
      port: 4009,
      name: "VoteBreakdown",
      eventArray: ["postCreated", "voteCreated"],
    });
    this.app.listen(port, () => {
      console.log(`Breakdown server started on ${port}`);
    });
  }
}

// Start the server
const server = new BreakdownServer(process.env.DATABASE_URL!);
server.start();
