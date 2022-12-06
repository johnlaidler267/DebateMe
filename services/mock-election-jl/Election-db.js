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
      create type ballot as
      (
        userID varchar(30),
        vote varchar(30)
      );
      create table if not exists elections (
        electionID varchar(30),
        ballots ballot[]
      `;
    const res = await this.client.query(queryText);
  }

  async createVote(electionID, userID, vote) {
    const queryText = `
      insert into elections (electionID, ballots)
      values ($1, ($2, $3))
      `;
    const res = await this.client.query(queryText, [electionID, userID, vote]);
    return res.rows;
  }

  async getVote(electionID, userID) {
    const queryText = `
      select vote from elections
      where electionID = $1
      and
      votes.userID = $2
      `;
    const res = await this.client.query(queryText, [electionID, userID]);
    return res.rows;
  }
}