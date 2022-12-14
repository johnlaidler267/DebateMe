import express, { Express, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import axios from "axios";
import { ElectionDatabase } from "./election-db";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

interface Vote {
  electionID: string;
  userID: string;
  vote: string;
}

class ElectionServer {
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
    const self = this;

    // Casts vote to database, emits voteCreated event
    this.app.post("/vote", async (req, res) => {
      const { electionID, userID, vote } = req.body.params;
      const Vote: Vote = await self.db.createVote(electionID, userID, vote);

      // Send event to event bus
      await axios.post("http://eventbus:4010/events", {
        type: "voteCreated",
        data: {
          electionID: electionID,
          userID: userID,
          vote: vote,
        },
      });
      res.status(200).send(JSON.stringify(Vote));
    });

    // Returns whether or not a user has voted in an election
    this.app.get("/hasVoted", async (req, res) => {
      const { userID, electionID } = req.query;
      const hasVoted: boolean = await self.db.hasVoted(electionID, userID);
      res.status(200).send(JSON.stringify(hasVoted));
    });
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
const server: ElectionServer = new ElectionServer(process.env.DATABASE_URL!);
server.start();
