import 'dotenv/config';
import { query } from 'express';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class ModerationDatabase {
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
      create table if not exists moderation (
        userId varchar(30),
        rejected text[],
        accepted text[] 
      );  
        `
    const res = await this.client.query(queryText);
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }
  //left for future references
  async updateUser(userId:string, rejected:string[], accepted:string[]){
    const queryText =
    `UPDATE moderation SET rejected = '{${rejected}}', accepted = '{${accepted}}' WHERE userId = '${userId}' `;
    const res = await this.client.query(queryText);
    return res.rows;
  }


  // create commentVote
  async createUser(userId:string, rejected:string[], accepted:string[]) {
    const queryText = 'INSERT INTO moderation ( userId, rejected, accepted) VALUES ($1, $2, $3)';
    const res = await this.client.query(queryText, [userId, rejected, accepted]);
    return res.rows;
  };

  async retrieveUser(userId:string){
    const queryText = `SELECT * FROM moderation WHERE userId = '${userId}'`;
    const res = await this.client.query(queryText);
    return res.rows;
  }  
}

 