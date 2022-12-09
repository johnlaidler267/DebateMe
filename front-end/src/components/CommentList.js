import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";

const CommentList = ({ postId, comments, setComments }) => {

    const retrieveComments = async () => {
        const result = await axios.get(`http://localhost:4001/comments/get?postId=${postId}`)
        setComments(result.data)
    }
    useEffect(() => {
        retrieveComments();
      }, []);

      const createComment = async () => {
        console.log("placeholer")
      }

      //need to add username and replace userId
      const renderedComments = Object.values(comments).map((c) => {    
        return (
            <div
            key={c.commentid}
          >
          <Container className = "mt-4" style = {{width: "75%"}}>
           <Card className="pt-3 ps-2 pe-2 pb-3">
            <Card.Title> {c.username}</Card.Title> 
            <Card.Body className="ps-4 pe-4">
                    <p>{c.content}</p>
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