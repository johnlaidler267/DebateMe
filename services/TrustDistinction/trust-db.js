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

  /* Connects to the database server */
  async connect() {

    // Create a new pool using the connection string (dburl)
    this.pool = new Pool({
      connectionString: this.dburl
    });

    // Connect to the pool.
    this.client = await this.pool.connect();

    await this.init();
  }

  /* Initializes the trust database */
  async init() {
    const queryText = `
      create table if not exists scores (
        userID varchar(30),
        engagement float,
        reliability float
      );
    `;
    const res = await this.client.query(queryText);
  }

  /* Creates a new user */
  async initializeUser(userID) {
    const queryText = `INSERT INTO scores (userID, engagement, reliability) VALUES ($1, $2, $3)`;
    const res = await this.client.query(queryText, [userID, 0, 0]);
    return res.rows[0];
  }

  /* Get the engagement score for a user */
  async getEngagement(userID) {
    const queryText = `SELECT engagement FROM scores WHERE userID = $1;`;
    const res = await this.client.query(queryText, [userID]);
    return res.rows[0].engagement;
  }

  /* Get the reliability score for a user */
  async getReliability(userID) {
    const queryText = `SELECT reliability FROM scores WHERE userID = $1;`;
    const res = await this.client.query(queryText, [userID]);
    return res.rows[0].reliability;
  }

  /* Update the engagement score for a user */
  async updateEngagement(userID, score) {
    const queryText = `UPDATE scores SET engagement = $2 WHERE userID = $1;`;
    const res = await this.client.query(queryText, [userID, score]);
    return res.rows[0];
  }

  /* Update the reliability score for a user */
  async updateReliability(userID, reliability) {
    const queryText = `UPDATE scores SET reliability = $2 WHERE userID = $1;`;
    const res = await this.client.query(queryText, [userID, reliability]);
    return res.rows[0];
  }
}