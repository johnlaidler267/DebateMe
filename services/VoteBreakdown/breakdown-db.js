import 'dotenv/config';
import { query } from 'express';
import pg from 'pg';
import { createTypePredicateNodeWithModifier } from 'typescript';

// Get the Pool class from the pg module. 
// The Pool class is used to create a pool of connections to the database.
const { Pool } = pg;

/* Initializes the demographic database */
export class ElectionDatabase {

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
    //if you change any values in a table, either name or type of the variable or just deleting or adding values
    //you will need add DROP TABLE nameOfTable; to the top of the query text and run npm start once. Remove the statement after to avoid table being deleted every time
    const queryText = `
      create type candidate as
      (
        id varchar(30),
        voteCount int,
        ages int[],
        numBlack int,
        numHispanic int,
        numAsian int,
        numCaucasian int,
        numRaceOther int,
        locations varchar(30)[],
        totalVotes int,
        numMen int,
        numWomen int,
        numGenderOther int
      );
      create table if not exists electionBreakdowns (
        electionID varchar(30),
        candidates candidates[]
    `;
    const res = await this.client.query(queryText);
  }

  /* Updates the breakdown for a given election */
  async updateBreakdown(data) {
    const { vote, electionID, userID } = data

    const breakdown = await self.db.getBreakdown(electionID)

    const candidate0 = breakdown.candidates[0]
    const candidate1 = breakdown.candidates[1]

    if (vote === candidate0.id) {
      candidate0 = updateCandidate(candidate0, userID)
    }
    else {
      candidate1 = updateCandidate(candidate1, userID)
    }

    const query = `UPDATE electionBreakdowns SET candidates = ${[candidate0, candidate1]} WHERE electionID = $2`
    const res = await this.client.query(query, [electionID]);
    return res.rows;
  }

  /* Updates the breakdown for a given candidate */
  async updateCandidate(candidate, userID) {
    // get the users ID
    const { gender, age, location, race } = await self.db.getUser(userID)

    // Update gender count
    if (gender == "male") candidate.numMen++;
    else if (gender == "female") candidate.numWomen++;
    else candidate.numGenderOther++;

    //Update total votes
    candidate.totalVotes++;

    //Update age array
    candidate.ages.push(age);

    //Update location array
    candidate.locations.push(location);

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

}