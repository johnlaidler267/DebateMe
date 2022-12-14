import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import Modal from './Modal';

export default function Inbox() {
  const [ messages, setMessages ] = useState([]);
  const [ IsOpen, setIsOpen ] = useState(false);
  const [ Content, setContent ] = useState("");
  const [ isFetched, setIsFetched ] = useState(false);
  const { state } = useLocation();

  const fetchMessages = async () => {
    try {
        const json = sessionStorage.getItem('token') || "";
        const token = JSON.parse(json);
        const res = await axios.get(`http://messages:4003/messages/all?userId=${token.userId}&friendId=${state.userId}`);
        setMessages(res.data);
    } catch (error) {
        setTimeout(function() {
            setIsOpen(true);
            setContent(<div className="text-danger">{error.response.data.error}</div>);
        }, 1500);
      }
    setIsFetched(true);
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    setIsOpen(true);
    setContent(<CircularProgress sx={{color: "yellow"}} size={60}/>);
    const { message } = e.target;
    try {
        const json = sessionStorage.getItem('token') || "";
        const token = JSON.parse(json);
        await axios.post(`http://messages:4003/messages/create`, {
            senderId: token.userId,
            receiverId: state.userId,
            content: message.value
        });
        setIsOpen(false);
    } catch (error) {
        setTimeout(function() {
            setIsOpen(true);
            setContent(<div className="text-danger">{error.response.data.error}</div>);
        }, 1500);
      }
    setIsFetched(false);
  }

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

  const renderedMessages = Object.values(messages).map((m, index) => {
        return (
            <Card className="mb-3" key={index}>
                <br></br>
                <Card.Title className="text-center ps-3 pe-3 pt-2 pb-1">{m.senderIdUsername}<span className='position-absolute right-0 ms-5 ps-5 fw-light'>{timeSince(Date.now())} ago</span></Card.Title>
                <Card.Body>
                    <Container>
                        <p>{m.content}</p>
                    </Container>
                </Card.Body>
            </Card>
        );
    });

  useEffect(() => {
    if (!isFetched) {
        fetchMessages();
    }
  }, [sendMessage]);

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
        <Form onSubmit={sendMessage}>
            <Form.Group controlId="message" className='d-flex justify-content-center w-50 p-3'>
                <Form.Control type="text" placeholder="I like your post! Can we chat more?" required />
                <Button className="custom-btn" type="submit">Send</Button>
            </Form.Group>
        </Form>
        {renderedMessages}
        <Modal open={IsOpen} onClose={() => setIsOpen(false)}>{Content}</Modal>
    </>
  )
}
