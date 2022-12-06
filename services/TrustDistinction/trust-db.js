import 'dotenv/config';
import { query } from 'express';
import pg from 'pg';

// Get the Pool class from the pg module. 
// The Pool class is used to create a pool of connections to the database.
const { Pool } = pg;

export class TrustDatabase {

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
      create table if not exists scores (
        name varchar(30),
        diffuculty integer,
        parts text[] 
      );
        `;
  }

  async updateScore(userID, debates, comments, upvoteRatio, upvotes, dowbvotes, flags) {
    const queryText = `
        insert into scores (electionID, ballots)
        values ($1, ($2, $3))
        `;
    const res = await this.client.query(queryText, [userID, debates, comments, upvoteRatio, upvotes, dowbvotes, flags]);
    return res.rows;
  }

  async getScore(userID) {
    const queryText = `
        select * from scores
        where electionID = $1
        and
        votes.userID = $2
        `;
    const res = await this.client.query(queryText, [userID]);
    return res.rows;
  }
}