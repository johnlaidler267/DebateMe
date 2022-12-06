import 'dotenv/config';
import { query } from 'express';
import pg from 'pg';

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
      create table if not exists breakdowns (
        candidateID varchar(30),
        electionID varchar(30),
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
        `;
    const res = await this.client.query(queryText);
  }

  /* Updates the demographic breakdown for a given candidate */
  async updateBreakdown(vote, candidateID, electionID, userID) {
    //Get the demographic data of the user

    //Update gender count
    let numMen, numWomen, numGenderOther = getGenderCount(candidateID, electionID)
    if (gender == "male") numMen++;
    else if (gender == "female") numWomen++;
    else numGenderOther++;

    //Update total votes
    let totalVotes = getVotes(candidateID) + 1

    //Update age array
    let ages = getAges(candidateID)
    ages.push(age)

    //Update location array
    let locations = getLocations(candidateID)
    locations.push(location)

    //Update race count
    let numBlack, numHispanic, numAsian, numCaucasian, numRaceOther = getRaceCount(candidateID, electionID);
    if (race == "black") numBlack++;
    else if (race == "hispanic") numHispanic++;
    else if (race == "asian") numAsian++;
    else if (race == "caucasian") numCaucasian++;
    else numRaceOther++;

    //Construct query
    const queryText = `
        insert into scores (candidateID, electionID, voteCount, ages, numBlack, numHispanic, numAsian, numCaucasian, numRaceOther locations, totalVotes, numMen, numWomen, numGenderOther)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;

    //Send to database
    const res = await this.client.query(queryText, [candidateID, candidateName, voteCount, ages, race, locations, totalVotes, numMen, numWomen]);
    return res.rows;
  }

  /* Gets the race breakdown for a given candidate */
  async getRaceCount(candidateID, electionID) {
    const queryText = `
        select * from scores
        where candidateID = $1
        and
        electionID = $2
        `;
    const res = await this.client.query(queryText, [candidateID, electionID]);
    return res.rows;
  }

  /* Gets the age breakdown for a given candidate */
  async getGenderCount(candidateID, electionID) {
    const queryText = `
        select * from scores
        where candidateID = $1
        and
        electionID = $2
        `;
    const res = await this.client.query(queryText, [candidateID, electionID]);
    return res.rows;
  }

  /* Gets the demographic breakdown for a given candidate */
  async getBreakdown(candidateID, electionID) {
    const queryText = `
        select * from scores
        where candidateID = $1
        `;
    const res = await this.client.query(queryText, [candidateID, electionID]);
    return res.rows;
  }
}