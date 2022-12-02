import React from "react";
import { Button, Card, Form, Container } from 'react-bootstrap';

// Create  a form element that allows the user to create a new election
// Create a button that allows the user to submit the election
const CreateElection = () => {
    return (
        <div className="App">
            <Container fluid style={{
                backgroundColor: '#393f4d'
            }}>
                <br></br>
                <Card className="mb-3">
                    <br></br>
                    <Card.Title className="text-center">New Election</Card.Title>
                    <Card.Body>
                        <Container>
                            <Form>
                                <Form.Group controlId="formElectionName">
                                    <Form.Label>Election Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter election name" />
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="formElectionDescription">
                                    <Form.Label>Election Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter election description" />
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="candidate1">
                                    <Form.Label>Candidate 1</Form.Label>
                                    <Form.Control type="text" placeholder="Enter candidate 1" />
                                </Form.Group>
                                <br></br>
                                <Form.Group controlId="candidate2">
                                    <Form.Label>Candidate 2</Form.Label>
                                    <Form.Control type="text" placeholder="Enter candidate 2" />
                                </Form.Group>
                            </Form>
                            <br></br>
                            <Button variant="secondary" type="submit">Create</Button>
                        </Container>
                    </Card.Body>
                </Card>
                <br></br>
            </Container>
        </div >
    );
};

export default CreateElection;