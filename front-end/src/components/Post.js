import { useState, useEffect } from "react";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Button, Card, Form, Container, Row, Col, Heading, Pagination, Badge } from 'react-bootstrap';

export default function Post() {
  const [ Thread, setThread ] = useState();
  const { postId } = useParams();

  const fetchThread = async () => {
    const res = await axios.get(`http://localhost:4006/posts/get?postId=${postId}`);
    setThread(res.data);
  }

  useEffect(() => {
    fetchThread();
  }, []);

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  return (
    <>
      {!Thread ? (
        <div className='top-50 start-50 position-absolute'>
          <CircularProgress sx={{color: "yellow"}} size={60}/>
        </div> 
      ) : (
        <Container className="mt-4" style={{width: "55%"}}>
            <Card className="pt-3 ps-2 pe-2 pb-3">
              <div className="ps-4 pe-4">
                <p className="text-black-50">Posted by {Thread.username} {timeSince(new Date(Thread.date))} ago</p>
                <Card.Title className="text-start fw-bold">{Thread.title}</Card.Title>
              </div>
                <Card.Body className="ps-4 pe-4">
                    <p>{Thread.content}</p>
                </Card.Body>
            </Card>
        </Container>
      )}
    </>
  )
}
