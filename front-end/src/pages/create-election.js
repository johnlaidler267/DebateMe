import axios from "axios";
import { useState } from "react";
import { CircularProgress } from '@mui/material';
import { Button, Card, Form, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Create  a form element that allows the user to create a new election
// Create a button that allows the user to submit the election
const CreateElection = () => {
    const [ Loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      
      const { title, content, candidate1, candidate2 } = event.target;
      const candidate = [candidate1, candidate2];

    //   await axios.post('http://localhost:4006/posts/create', {
    //     title: title.value,
    //     content: content.value,
    //     candidate: candidate
    //   })
  
        setTimeout(function() {
            setLoading(true);
            setTimeout(function() {
                // navigate(`/post/${postId}`);
            }, 1000);
        }, 1000);
    }

    return (
        <div className="App">
            <Container fluid style={{
                backgroundColor: '#393f4d',
                width: '75%',
            }}>
                <br></br>
                <Card className="mb-3">
                    <br></br>
                    <Card.Title className="text-center">New Election</Card.Title>
                    <Card.Body>
                        <Container>
                            <Form onSubmit={(e) => onSubmit(e)}>
                                <Form.Group controlId="title">
                                    <Form.Label>Election Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter election name" required />
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="content">
                                    <Form.Label>Election Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter election description" required />
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="candidate1">
                                    <Form.Label>Candidate 1</Form.Label>
                                    <Form.Control type="text" placeholder="Enter candidate 1" required />
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="candidate2">
                                    <Form.Label>Candidate 2</Form.Label>
                                    <Form.Control type="text" placeholder="Enter candidate 2" required />
                                </Form.Group>
                                <Button className="mt-4" variant="secondary" type="submit">
                                    {Loading ? <CircularProgress sx={{color: "yellow"}} size={40}/> : "Create"}
                                </Button>
                            </Form>
                            <br></br>
                        </Container>
                    </Card.Body>
                </Card>
                <br></br>
            </Container>
        </div >
    );
};

export default CreateElection;