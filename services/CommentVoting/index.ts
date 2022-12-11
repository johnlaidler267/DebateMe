import express, { Express, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import axios from "axios";
import { CommentsVoteDatabase } from "./CommentsVote-db";
import { exit } from "process";

interface CommentSingleVote {
  userId: string; //userID of person who voted
  commentId: string; //string
  vote: string; //string Up or Down
  ownerId: string; //userID of the owner of this comment
}
interface CommentStoredVotes {
  commentId: string; // string
  ownerId: string; //string
  upvotes: string[]; //array of user ID's
  downvotes: string[]; //array of userID's
}

class CommentVoteServer {
  app: Express;
  dburl: string;
  db!: CommentsVoteDatabase;

  constructor(dburl: string) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(cors());
  }

  async initRoutes() {
    const self = this;

    this.app.post("/comments/vote", async (req: Request, res: Response) => {
      const commentId = req.query.commentId as string;
      const vote = req.query.vote as string;
      const userId = req.query.userId as string;
      const ownerId = req.query.ownerId as string;
      let storedVotes = await self.db.getCommentVotes(commentId); //should only ever be 1 object for each commemtID
      if (storedVotes.length === 0) {
        //if it's the first vote on this comment
        let upvotes: string[] = [];
        let downvotes: string[] = [];
        if (vote.toLowerCase() === "up") {
          upvotes = [userId];
          downvotes = [];
        } else if (vote.toLowerCase() === "down") {
          upvotes = [];
          downvotes = [userId];
        } else {
          //error handling, should this even be possible?
        }
        const voteObj = await self.db.createCommentVote(
          commentId,
          upvotes,
          downvotes,
          ownerId
        );
        res.status(200).send(JSON.stringify(voteObj)); //voteObj not sending right object? need to debug
      } else {
        let votesStored: CommentStoredVotes = storedVotes[0];
        let newUpvotes: string[] = votesStored.upvotes;
        let newDownvotes: string[] = votesStored.downvotes;
        if (votesStored.upvotes.includes(userId)) {
          if (vote.toLowerCase() === "down") {
            const index = votesStored.upvotes.indexOf(userId);
            newUpvotes.splice(index, 1);
            newDownvotes.push(userId);
          } else {
            res.status(200).send("No Changes");
            return;
          }
        } else if (votesStored.downvotes.includes(userId)) {
          if (vote.toLowerCase() === "up") {
            const index = votesStored.downvotes.indexOf(userId);
            newUpvotes.push(userId);
            newDownvotes.splice(index, 1);
          } else {
            res.status(200).send("No Changes");
            return;
          }
        } else {
          if (vote.toLowerCase() === "up") {
            newUpvotes.push(userId);
          } else {
            newDownvotes.push(userId);
          }
        }
        const voteObj = await self.db.updateVote(
          commentId,
          newUpvotes,
          newDownvotes
        );
        console.log(voteObj);
        res.status(200).send(JSON.stringify(voteObj)); //voteObj not sending right object? need to debug
      }
      await axios.post("http://localhost:4010/events", {
        type: "commentVoted",
        data: {
          userId: userId,
          commentId: commentId,
          ownerId: ownerId,
          vote: vote,
        },
      });
    });

    //get all votes for a given commentID
    this.app.get("/comments/getVotes", async (req: Request, res: Response) => {
      const commentId = req.query.commentId as string;
      const storedVotes = await self.db.getCommentVotes(commentId);
      res.status(200).send(JSON.stringify(storedVotes));
    });

    this.app.post("/events", (req: Request, res: Response) => {
      console.log(req.body.type);
      res.send({});
    });
  }
  async initDb() {
    this.db = new CommentsVoteDatabase(this.dburl);
    await this.db.connect();
  }
  async start() {
    await this.initRoutes();
    await this.initDb();

    const port = process.env.PORT || 4002;
    this.app.listen(port, () => {
      console.log(`Comment Vote server started on ${port}`);
    });
  }
}

const server: CommentVoteServer = new CommentVoteServer(
  process.env.DATABASE_URL!
);
server.start();
