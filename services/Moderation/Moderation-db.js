import 'dotenv/config';
import { query } from 'express';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class ModerationDatabase {
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
      create table if not exists moderation (
        userID varchar(30),
        rejectedComments text[],
        acceptedComments text[] 
      );
        `
    const res = await this.client.query(queryText);
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }
  //left for future reference
  async updateVote(commentID, upvotes, downvotes){
    const queryText =
    `UPDATE commentVotes SET upvotes = '{${upvotes}}', downvotes = '{${downvotes}}' WHERE commentID = '${commentID}' `;
    const res = await this.client.query(queryText);
    return res.rows;
  }


  // create commentVote
  async createCommentVote(commentID, upvotes, downvotes) {
    const queryText = 'INSERT INTO commentVotes ( commentID, upvotes, downvotes) VALUES ($1, $2, $3)';
    const res = await this.client.query(queryText, [commentID, upvotes, downvotes]);
    return res.rows;
  };

  // gets all vote on a given comment
  async getCommentVotes(commentID) {
    const queryText = `SELECT * FROM commentVotes WHERE commentID = '${commentID}'`
    const res = await this.client.query(queryText); 
    return res.rows
  }

}