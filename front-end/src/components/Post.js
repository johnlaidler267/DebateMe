import { useState, useEffect } from "react";
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

  return (
    <Container>
      {/* {Thread} */}
    </Container>
  )
}
