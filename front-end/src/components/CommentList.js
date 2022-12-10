import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import Upvote from './Upvote'
import Downvote from './Downvote'

const CommentList = ({ postId, comments, setComments }) => {

    const retrieveComments = async () => {
        const result = await axios.get(`http://localhost:4001/comments/get?postId=${postId}`)
        setComments(result.data)
    }
    useEffect(() => {
        retrieveComments();
      }, []);


      const renderedComments = Object.values(comments).map((c) => {    
        return (
            <div
            key={c.commentid}
          >
          <Container className = "mt-4" style = {{width: "75%"}}>
           <Card className="pt-3 ps-2 pe-2 pb-3">
            <Card.Title> {c.username}</Card.Title> 
            <Card.Body className="ps-4 pe-4">
            <div align = "left"><Upvote commentId = {c.commentid} ownerId = {c.userid}/></div>

            <p align = "center">{c.content}</p>
            <div align = "right"><Downvote commentId = {c.commentid} ownerId = {c.userid}/></div>
            </Card.Body>
            
            </Card>
            </Container>
            </div>
        );
      });

    return (
      <div>
        {renderedComments}
      </div>
    )
  }



export default CommentList