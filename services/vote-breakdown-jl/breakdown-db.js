import 'dotenv/config';
import { query } from 'express';
import pg from 'pg';

// Get the Pool class from the pg module. 
// The Pool class is used to create a pool of connections to the database.
const { Pool } = pg;

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
        candidateName varchar(30),
        voteCount int,
        ages int[],
        race varchar(30)[],
        locations varchar(30)[],
        totalVotes int,
        numMen int,
        numWomen int
      );
        `;
    const res = await this.client.query(queryText);
  }

  async updateBreakdown(candidateID, candidateName, age, race, location, gender) {

    //Update gender count
    let numMen, numWomen, numOther = 0
    if (gender == "male") numMen = getGenderCount(candidateID, "male") + 1;
    else if (gender == "female") numWomen = getGenderCount(candidateID, "female") + 1;
    else numGenderOther = getGenderCount(candidateID, "other") + 1;

    //Update total votes
    let totalVotes = getVotes(candidateID) + 1

    //Update age array
    let ages = getAges(candidateID)
    ages.push(age)

    //Update location array
    let locations = getLocations(candidateID)
    locations.push(location)

    //Update race count
    if (race == "black") numBlack = getRaceCount(candidateID, "black") + 1
    else if (race == "hispanic") numHispanic = getRaceCount(candidateID, "hispanic") + 1
    else if (race == "asian") numAsian = getRaceCount(candidateID, "asian") + 1
    else if (race == "caucasian") numCaucasian = getRaceCount(candidateID, "caucasian") + 1
    else numRaceOther = getRaceCount(candidateID, "other") + 1

    //Construct query
    const queryText = `
        insert into scores (candidateID, candidateName, voteCount, ages, numBlack, numHispanic, numAsian, numCaucasian, numRaceOther locations, totalVotes, numMen, numWomen, numGenderOther)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;

    //Send to database
    const res = await this.client.query(queryText, [candidateID, candidateName, voteCount, ages, race, locations, totalVotes, numMen, numWomen]);
    return res.rows;
  }

  async getBreakdown(electionID) {
    const queryText = `
        select * from scores
        where electionID = $1
        `;
    const res = await this.client.query(queryText, [electionID]);
    return res.rows;
  }
}