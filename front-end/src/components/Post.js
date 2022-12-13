import { useState, useEffect, useRef } from "react";
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Card, Container, Button } from 'react-bootstrap';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Modal from "./Modal";
import CommentCreate from './Comments/CommentCreate/CommentCreate'
import CommentList from './Comments/CommentList/CommentList'
import { SettingsVoiceOutlined } from "@mui/icons-material";

export default function Post() {
  const navigate = useNavigate();
  const [Thread, setThread] = useState();
  const { postId } = useParams();
  const [Toggle, setIsToggle] = useState(false);
  const [ToggleOn, setToggleOn] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [Content, setContent] = useState("");
  const listRef = useRef();
  const [comments, setComments] = useState({})
  const [voted, setVoted] = useState(false)

  /* Fetches the thread from the backend */
  const fetchThread = async () => {
    const res = await axios.get(`http://localhost:4006/posts/get?postId=${postId}`);
    setThread(res.data);
  }

  const handleToggle = () => {
    ToggleOn ? listRef.current.style.display = "none" : listRef.current.style.display = "flex";
    setToggleOn(!ToggleOn);
  }

  /* Handles the deletion of a post */
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
      setContent(<CircularProgress sx={{ color: "black" }} size={60} />);
      setTimeout(function () {
        setContent(<div className="text-success text-center">You have deleted your post!<br></br><CheckCircleIcon sx={{ fontSize: 150 }} /></div>);
        setTimeout(function () {
          navigate('/');
        }, 1500);
      }, 1500);

    } catch (error) {
      setTimeout(function () {
        setIsOpen(true);
        setContent(<div className="text-danger">{error.response.data.error}</div>);
      }, 1500);
    }
  }

  useEffect(() => {
    fetchThread();
  }, []);

  /* On page load, check if the user is the owner of the post */
  useEffect(() => {
    if (sessionStorage.getItem('token') && Thread) {
      const token = JSON.parse(sessionStorage.getItem('token') || "");
      if (Thread.userId === token.userId) {
        setIsToggle(true);
      }
    }
  }, [Thread])

  /* On page load, check if the user has already voted in the election */
  useEffect(() => {
    console.log("LOADING HAS VOTED")
    const token = JSON.parse(sessionStorage.getItem('token') || "");
    fetchData();
    async function fetchData() {
      const response = await axios.get('http://localhost:4004/hasVoted',
        {
          params:
          {
            userID: token.userId,
            electionID: postId
          }
        }).then((response) => {
          console.log("RESPONSE", response.data)
          setVoted(response.data);
        }
        ).catch((error) => {
          console.log(error);
        });
    }
  }, []);


  /* Calculate time since post was created */
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

  /* If the user has voted, display the Cast Vote button, otherwise display the View Election Results button */
  const VoteOrResults = () => {
    console.log("VOTED: ", voted)
    if (!voted) {
      return <Button onClick={() => navigate('vote', { state: Thread })}> Cast Vote</Button>
    } else {
      return <Button onClick={() => navigate('breakdown', { state: Thread })}> View Election Results</ Button>
    }
  }

  return (
    <>
      <Container fluid style={{
        backgroundColor: '#393f4d',
        width: '75%',
      }}>
        <Card style={{ margin: "10px", padding: "10px" }}>
          <VoteOrResults />
          {!Thread ? (
            <div className='top-50 start-50 position-absolute'>
              <CircularProgress sx={{ color: "yellow" }} size={60} />
            </div>
          ) : (
            <Container className="mt-4" style={{ width: "55%" }}>
              <Card className="pt-3 ps-2 pe-2 pb-3">
                {Toggle && (
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
          <div className="container">
            <CommentCreate postId={postId} comments={comments} setComments={setComments} />
            <CommentList postId={postId} comments={comments} setComments={setComments} />
          </div>
        </Card>
      </Container>
    </>

  )
}
