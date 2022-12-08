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
    // //if you change any values in a table, either name or type of the variable or just deleting or adding values
    // //you will need add DROP TABLE nameOfTable; to the top of the query text and run npm start once. Remove the statement after to avoid table being deleted every time
    // const queryText = `
    //   create type candidate as
    //   (
    //     id varchar(30),
    //     voteCount int,
    //     under25 int,
    //     to65 int,
    //     over65 int,
    //     numBlack int,
    //     numHispanic int,
    //     numAsian int,
    //     numCaucasian int,
    //     numRaceOther int,
    //     totalVotes int,
    //     numMen int,
    //     numWomen int,
    //     numGenderOther int
    //   );
    //   create table if not exists electionBreakdowns (
    //     electionID varchar(30),
    //     candidates candidates[]
    // `;
    // const res = await this.client.query(queryText);
  }

  /* Updates the breakdown for a given election */
  async updateBreakdown(data) {
    const { electionID, userID, vote } = data

    const breakdown = await self.db.getBreakdown(electionID)

    if (breakdown == null)
      breakdown = { electionID, candidates: newCandidates() }

    const candidate0 = breakdown.candidates[0]
    const candidate1 = breakdown.candidates[1]

    if (vote === candidate0.id)
      candidate0 = updateCandidate(candidate0, userID)
    else
      candidate1 = updateCandidate(candidate1, userID)

    const query = `UPDATE electionBreakdowns SET candidates = ${ARRAY([candidate0, candidate1])}::candidates[] WHERE electionID = $2`
    const res = await this.client.query(query, [electionID]);
    return res.rows;
  }

  /* Updates the breakdown for a given candidate */
  async updateCandidate(candidate, userID) {
    // get the users ID (FIGURE THIS OUT)
    const { gender, age, race } = await self.getUserData(userID)

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

  /* Gets the demographic breakdown for a given candidate */
  async getBreakdown(electionID) {
    const queryText = `SELECT * FROM electionBreakdowns WHERE electionID = '${electionID}'`
    const res = await this.client.query(queryText, [electionID]);
    return res.rows;
  }

  async newCandidates(electionID) {
    id0, id1 = await self.db.getCandidates(electionID)
    return [
      {
        id: id0,
        voteCount: 0,
        under25: 0,
        to65: 0,
        over65: 0,
        numBlack: 0,
        numHispanic: 0,
        numAsian: 0,
        numCaucasian: 0,
        numRaceOther: 0,
        totalVotes: 0,
        numMen: 0,
        numWomen: 0,
        numGenderOther: 0
      },
      {
        id: id1,
        voteCount: 0,
        under25: 0,
        to65: 0,
        over65: 0,
        numBlack: 0,
        numHispanic: 0,
        numAsian: 0,
        numCaucasian: 0,
        numRaceOther: 0,
        totalVotes: 0,
        numMen: 0,
        numWomen: 0,
        numGenderOther: 0
      }
    ]
  }
}

