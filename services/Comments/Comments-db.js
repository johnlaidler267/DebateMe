import 'dotenv/config';
import { query } from 'express';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class CommentsDatabase {
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
      create table if not exists comments (
        userID varchar(30),
        parentID varchar(30),
        commentID varchar(30),
        postID varchar(30),
        content varchar(130) 
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
  async updatePassword(username, passwordN){
    const queryText =
    `UPDATE users SET password = '${passwordN}' WHERE username = '${username}' `;
    const res = await this.client.query(queryText);
    return res.rows;
  }
//left for future reference
  async deleteUser(username){
    const queryText =
    `DROP TABLE users WHERE username = '${username}' `;
    const res = await this.client.query(queryText);
    return res.rows;
  }

  // create comment
  async createComment(userID, parentID, commentID, postID, content) {
    //console.log(userID, parentID, commentID, postID, content)
    const queryText = 'INSERT INTO comments (userID, parentID, commentID, postID, content) VALUES ($1, $2, $3, $4, $5)';
    const res = await this.client.query(queryText, [userID, parentID, commentID, postID, content]);
    return res.rows;
  };

  // gets all comments on a given post
  async getPostComments(postID) {
    const queryText = `SELECT * FROM comments where postID = '${postID}'`
    const res = await this.client.query(queryText); 
    return res.rows
  }

}