import "dotenv/config";
import { query } from "express";
import pg from "pg";

// Get the Pool class from the pg module.
// The Pool class is used to create a pool of connections to the database.
const { Pool } = pg;

/* Initializes the demographic database */
export class BreakdownDatabase {
  dburl: string;
  pool!: pg.Pool;
  client!: pg.PoolClient;

  constructor(dburl: string) {
    this.dburl = dburl;
  }

  async connect() {
    this.pool = new Pool({
      connectionString: this.dburl,
    });

    // Create the pool.
    this.client = await this.pool.connect();

    // Init the database.
    await this.init();
  }

  async init() {
    const queryText = `
    DO $$ BEGIN
      CREATE TYPE candidate AS
      (
        id varchar(100),
        voteCount int,
        under25 int,
        to65 int,
        over65 int,
        numBlack int,
        numHispanic int,
        numAsian int,
        numCaucasian int,
        numRaceOther int,
        totalVotes int,
        numMen int,
        numWomen int,
        numGenderOther int
      );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      CREATE TABLE IF NOT EXISTS electionBreakdowns (
        electionID varchar(100),
        candidate0 candidate,
        candidate1 candidate
      );
    `;
    const res = await this.client.query(queryText);
  }

  /* Updates the breakdown for a given election */
  async updateBreakdown(
    electionID: string,
    vote: string,
    race: string,
    age: string,
    gender: string
  ) {
    const breakdown = await this.getBreakdown(electionID);
    console.log("breakdown: ", breakdown);

    let candidate0 = breakdown.candidate0.replace(/[{()}]/g, "").split(",");
    let candidate1 = breakdown.candidate1.replace(/[{()}]/g, "").split(",");

    if (vote === candidate0[0])
      candidate0 = await this.updateCandidate(candidate0, race, age, gender);
    else candidate1 = await this.updateCandidate(candidate1, race, age, gender);

    candidate0 = "(" + candidate0.join(",") + ")";
    candidate1 = "(" + candidate1.join(",") + ")";

    const query = `UPDATE electionBreakdowns SET candidate0 = $1, candidate1 = $2 WHERE electionID = $3`;
    const res = await this.client.query(query, [
      candidate0,
      candidate1,
      electionID,
    ]);
    return res.rows;
  }

  /* Updates the breakdown for a given candidate */
  async updateCandidate(
    candidate: any[],
    race: string,
    age: string,
    gender: string
  ) {
    // Update gender count
    if (gender == "male") candidate[11]++;
    else if (gender == "female") candidate[12]++;
    else candidate[13]++;

    //Update total votes
    candidate[1]++;

    //Update age count
    if (parseInt(age) < 25) candidate[2]++;
    else if (parseInt(age) <= 65 && parseInt(age) >= 25) candidate[3]++;
    else candidate[4]++;

    //Update race count
    if (race == "black") candidate[5]++;
    else if (race == "hispanic") candidate[6]++;
    else if (race == "asian") candidate[7]++;
    else if (race == "caucasian") candidate[8]++;
    else candidate[9]++;

    return candidate;
  }

  /* Genderates a new blank breakdown whenever a post (election) is created */
  async createBreakdown(electionID: string, cand0: any, cand1: any) {
    const queryText = `INSERT INTO electionBreakdowns (electionID, candidate0, candidate1) VALUES ($1, row($2,0,0,0,0,0,0,0,0,0,0,0,0,0), row($3,0,0,0,0,0,0,0,0,0,0,0,0,0))`;
    const res = await this.client.query(queryText, [electionID, cand0, cand1]);
  }

  /* Gets the demographic breakdown for a given candidate */
  async getBreakdown(electionID: string) {
    const queryText = `SELECT * FROM electionBreakdowns WHERE electionID = $1`;
    const res = await this.client.query(queryText, [electionID]);
    return res.rows[0];
  }
}
