import React, { useState, useRef } from 'react';
import { Button, Card, Form, Container, Col, Row, Modal } from 'react-bootstrap';
import "./vote.css";
import VoteButton from '../../components/VoteButton/vote-button';

const Vote = () => {
    const c1 = useRef(null)
    const c2 = useRef(null)
    return (
        <div className="App">
            <Container fluid style={{
                backgroundColor: '#393f4d',
                width: '75%',
            }}>
                <br></br>
                <Card className="mb-3">
                    <Button variant="outline-primary" style={{ width: "10%", margin: "10px" }}>Back</Button>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <Card>
                                        <h2 className="text-center" style={{ margin: "10px" }} >Candidate 1</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        <Button className="tomato-btn">Vote</Button>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <h2 className="text-center" style={{ margin: "10px" }}>Candidate 2</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        <Button className="orange-btn" >Vote</Button>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card >
                <br></br>
            </Container >
        </div >
    );
}

export default Vote;