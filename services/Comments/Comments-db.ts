import 'dotenv/config';
import pg  from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class CommentsDatabase {
  dburl: string;
  pool!: pg.Pool;
  client!:pg.PoolClient

  constructor(dburl:string) {
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
        username varchar(50),
        userId varchar(50),
        parentId varchar(50),
        commentId varchar(50),
        postId varchar(50),
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


  // create comment
  async createComment(username:string ,userId:string, parentId:string, commentId:string, postId:string, content:string) {
    //console.log(userID, parentID, commentID, postID, content)
    const queryText:string = 'INSERT INTO comments (username, userId, parentId, commentId, postId, content ) VALUES ($1, $2, $3, $4, $5, $6)';
    const res = await this.client.query(queryText, [username, userId, parentId, commentId, postId, content ]);
    return res.rows;
  };

  // gets all comments on a given post
  async getPostComments(postId:string) {
    const queryText:string = `SELECT * FROM comments where postId = '${postId}'`
    const res = await this.client.query(queryText); 
    return res.rows
  }
  //get all comments for a given user
  async getUserComments(userId:string) {
    const queryText = `SELECT * FROM comments where userId = '${userId}'`
    const res = await this.client.query(queryText); 
    return res.rows
  }

  async deleteComment(commentId: string){
    const queryText = `DELETE FROM comments WHERE commentId = '${commentId}'`;
    const res = await this.client.query(queryText)
    return res.rows
  }

}