import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class CommentsVoteDatabase {
  dburl: string;
  pool!: pg.Pool;
  client!:pg.PoolClient
  constructor(dburl: string) {
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
      create table if not exists commentVotes (
        commentId varchar(50),
        upvotes text[],
        downvotes text[],
        ownerId varchar(50)
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
  async updateVote(commentId:string, upvotes:string[], downvotes:string[]){
    const queryText =
    `UPDATE commentVotes SET upvotes = '{${upvotes}}', downvotes = '{${downvotes}}' WHERE commentId = '${commentId}' `;
    const res = await this.client.query(queryText);
    return res.rows;
  }


  // create commentVote
  async createCommentVote(commentId:string, upvotes:string[], downvotes:string[], ownerId:string) {
    const queryText = 'INSERT INTO commentVotes ( commentId, upvotes, downvotes, ownerId) VALUES ($1, $2, $3, $4)';
    const res = await this.client.query(queryText, [commentId, upvotes, downvotes, ownerId ]);
    return res.rows;
  };

  // gets all vote on a given comment
  async getCommentVotes(commentId:string) {
    const queryText = `SELECT * FROM commentVotes WHERE commentId = '${commentId}'`
    const res = await this.client.query(queryText); 
    return res.rows
  }

}