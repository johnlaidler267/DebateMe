import { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col, Pagination, Badge } from 'react-bootstrap';
import { FaCentercode } from "react-icons/fa";
import axios from 'axios';
import "./comment.css"
const CommentCreate = ({ postId, comments, setComments }) => {
  const [Value, setValue] = useState("");

  const newComment = async () =>{
    const token = JSON.parse(sessionStorage.getItem('token'));
    let username = ""
    let userId = ""
    if(token === null){
      username= "Guest"
      userId = "Guest"
    }
    else{
      username = token.username
      userId = token.userId
    }
    await axios.post(`http://localhost:4001/addComment?userId=${userId}&postId=${postId}&content=${Value}&parentId=${postId}1&username=${username}`); //maye need to change/get rid of parentId
  }

  return (
    <div>
      <center>
      <form onSubmit={newComment}>
        
          <label>Create New Comment
          <input type="text" value = {Value} onChange={(e) => setValue(e.target.value)} ></input>
          </label>
        <button className="custom-btn">Submit Comment</button>
      </form>
      </center>
    </div>
    
  )
}
export default CommentCreate