import 'dotenv/config';
import { query } from 'express';
import pg from 'pg';

// Get the Pool class from the pg module. 
// The Pool class is used to create a pool of connections to the database.
const { Pool } = pg;

/* Initializes the demographic database */
export class BreakdownDatabase {

  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    this.pool = new Pool({
      connectionString: this.dburl
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
  async updateBreakdown(electionID, vote, race, age, gender) {
    const breakdown = await self.db.getBreakdown(electionID)

    const candidate0 = breakdown.candidate0
    const candidate1 = breakdown.candidate1

    if (vote === candidate0.id)
      candidate0 = updateCandidate(candidate0, race, age, gender)
    else
      candidate1 = updateCandidate(candidate1, race, age, gender)

    const query = `UPDATE electionBreakdowns SET candidate0 = $1, candidate1 = $2 WHERE electionID = $3`;
    const res = await this.client.query(query, [electionID, candidate0, candidate1]);
    return res.rows;
  }

  /* Updates the breakdown for a given candidate */
  async updateCandidate(candidate, race, age, gender) {

    // Update gender count
    if (gender == "male") candidate.numMen++;
    else if (gender == "female") candidate.numWomen++;
    else candidate.numGenderOther++;

    //Update total votes
    candidate.totalVotes++;

    //Update age count
    if (candidate.age < 25) candidate.under25++;
    else if (candidate.age <= 65 && candidate.age >= 25) candidate.to65++;
    else candidate.over65++;

    //Update race count
    if (race == "black") candidate.numBlack++;
    else if (race == "hispanic") candidate.numHispanic++;
    else if (race == "asian") candidate.numAsian++;
    else if (race == "caucasian") candidate.numCaucasian++;
    else candidate.numRaceOther++;

    return candidate;
  }

  /* Genderates a new blank breakdown whenever a post (election) is created */
  async createBreakdown(electionID, cand0, cand1) {
    console.log(electionID, cand0, cand1)
    const queryText = `INSERT INTO electionBreakdowns (electionID, candidate0, candidate1) VALUES ($1, row($2,0,0,0,0,0,0,0,0,0,0,0,0,0), row($3,0,0,0,0,0,0,0,0,0,0,0,0,0))`;
    const res = await this.client.query(queryText, [electionID, cand0, cand1]);
  }

  /* Gets the demographic breakdown for a given candidate */
  async getBreakdown(electionID) {
    const queryText = `SELECT * FROM electionBreakdowns WHERE electionID = $1`;
    const res = await this.client.query(queryText, [electionID]);
    return res.rows;
  }
}

