import axios from "axios";
import { useContext, useState } from "react";
import { CircularProgress } from '@mui/material';
import { Button, Card, Form, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

// Create  a form element that allows the user to create a new election
// Create a button that allows the user to submit the election
const CreateElection = () => {
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { Auth } = useContext(AuthContext);
    const [IsOpen, setIsOpen] = useState(false);
    const [Content, setContent] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { title, content, candidate1, candidate2 } = event.target;
        const candidate = [candidate1.value, candidate2.value];

        try {
            const res = await axios.post('http://localhost:4006/posts/create', {
                userId: Auth.userId,
                username: Auth.username,
                title: title.value,
                content: content.value,
                candidate: candidate
            })

            setTimeout(function () {
                navigate(`/post/${res.data.postId || ""}`);
            }, 1000);
        } catch (error) {
            setTimeout(function () {
                setIsOpen(true);
                setContent(<div className="text-danger">{error.response.data.error}</div>);
                setLoading(false);
            }, 1500);
        }
    }

    return (
        <div className="App">
            <Container fluid style={{
                backgroundColor: '#393f4d',
                width: '75%',
            }}>
                <br></br>
                <Card className="mb-3 ps-4 pe-4">
                    <br></br>
                    <Card.Header>
                        <Card.Title className="text-center">New Election</Card.Title>
                    </Card.Header>
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
                                    {Loading ? <CircularProgress sx={{ color: "yellow" }} size={40} /> : "Create"}
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