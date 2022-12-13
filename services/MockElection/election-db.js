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

  /* Connects to the database server */
  async connect() {
    this.pool = new Pool({
      connectionString: this.dburl
    });

    // Create the pool.
    this.client = await this.pool.connect();

    // Init the database.
    await this.init();
  }

  /* Initializes the election database */
  async init() {
    const queryText = `
      create table if not exists elections 
      (
        electionID varchar(100),
        userID varchar(100),
        vote varchar(100)
      );
      `;
    const res = await this.client.query(queryText);
  }

  /* Creates a new vote */
  async createVote(electionID, userID, vote) {
    const queryText = `INSERT INTO elections (electionID, userID, vote) VALUES ($1, $2, $3)`;
    const res = await this.client.query(queryText, [electionID, userID, vote]);
    return res.rows[0];
  }
}