import { useState, useEffect, useRef } from "react";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Modal from "./Modal";

export default function Post() {
  const [ Thread, setThread ] = useState();
  const { postId } = useParams();
  const [ Toggle, setIsToggle ] = useState(false);
  const [ ToggleOn, setToggleOn ] = useState(false);
  const [ IsOpen, setIsOpen ] = useState(false);
  const [ Content, setContent ] = useState("");
  const listRef = useRef();
  const navigate = useNavigate();

  const fetchThread = async () => {
    const res = await axios.get(`http://localhost:4006/posts/get?postId=${postId}`);
    setThread(res.data);
  }

  const handleToggle = () => {
     ToggleOn ? listRef.current.style.display = "none" : listRef.current.style.display = "flex";
     setToggleOn(!ToggleOn);
  }

  const handleDelete = async () => {
    try {
        const json = sessionStorage.getItem('token') || "";
        const token = JSON.parse(json);
       await axios.delete('http://localhost:4006/posts/delete', {
          data: {
            userId: token.userId,
            postId: Thread.postId
          }
        });

        setIsOpen(true);
        setContent(<CircularProgress sx={{color: "black"}} size={60}/>);
        setTimeout(function() {
          setContent(<div className="text-success text-center">You have deleted your post!<br></br><CheckCircleIcon sx={{ fontSize: 150 }}/></div>);
          setTimeout(function() {
            navigate('/');
          }, 1500);
        }, 1500);
    
    } catch (error) {
      setTimeout(function() {
          setIsOpen(true);
          setContent(<div className="text-danger">{error.response.data.error}</div>);
      }, 1500);
    }
  }

  useEffect(() => {
    fetchThread();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('token') && Thread) {
      const token = JSON.parse(sessionStorage.getItem('token') || "");
      if (Thread.userId === token.userId) {
        setIsToggle(true);
      }
    }
  }, [Thread])
  

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
              { Toggle && (
                <div className="toggle">
                  <MoreHorizIcon onClick={handleToggle} sx={{ fontSize: 28 }} className="toggle-button" />
                  <ul ref={listRef}>
                    <li onClick={() => navigate('update', { state: Thread })}><ModeEditIcon />Edit</li>
                    <li onClick={handleDelete}><ClearIcon />Delete</li>
                  </ul>
                </div>
                )
              }
              <div className="ps-4 pe-4">
                <p className="text-black-50 m-0 mt-2 mb-2">Posted by {Thread.username} {timeSince(new Date(Thread.date))} ago</p>
                <Card.Title className="fw-bold">{Thread.title}</Card.Title>
              </div>
                <Card.Body>
                    <p>{Thread.content}</p>
                </Card.Body>
            </Card>
            <Modal open={IsOpen} onClose={() => setIsOpen(false)}>{Content}</Modal>
        </Container>
      )}
    </>
  )
}
