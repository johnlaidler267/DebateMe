import "./debate.css"
import React from "react";
import { Button, Card, Form, Container, Row, Col, Heading, Pagination, Badge } from 'react-bootstrap';
import { ClockHistory } from "react-bootstrap-icons";

const Debate = () => {
    return (
        <Container fluid style={{
            backgroundColor: '#393f4d'
        }}>
            <br></br>
            <div style={{
                backgroundColor: '#393f4d'
            }}>
                <h2 style={{ color: "#feda6a" }}>
                    Debate of the Week.  <Badge bg="secondary" style={{ color: "#feda6a" }}>Hot 🔥</Badge>
                </h2>
            </div>
            <br></br>
            <Row>
                <Col>
                    <Card className="mb-3">
                        <br></br>
                        <Card.Title className="text-center">Election Name</Card.Title>
                        <Card.Body>
                            <Container>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Container>
                        </Card.Body>
                        <Button className="custom-btn">Debate</Button>
                    </Card>
                </Col>
            </Row>

            <br></br>
            <div>
                <h3 style={{ color: "#feda6a" }}>
                    Explore Debates.
                </h3>
            </div>
            <br></br>

            <Row>
                <Col>
                    <Card className="mb-3">
                        <br></br>
                        <Card.Title className="text-center">Election Name</Card.Title>
                        <Card.Body>
                            <Container>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Container>
                        </Card.Body>
                        <Button className="custom-btn">Debate</Button>
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3">
                        <br></br>
                        <Card.Title className="text-center">Election Name</Card.Title>
                        <Card.Body>
                            <Container>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Container>
                        </Card.Body>
                        <Button className="custom-btn">Debate</Button>
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3">
                        <br></br>
                        <Card.Title className="text-center">Election Name</Card.Title>
                        <Card.Body>
                            <Container>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Container>
                        </Card.Body>
                        <Button className="custom-btn">Debate</Button>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="mb-3">
                        <br></br>
                        <Card.Title className="text-center">Election Name</Card.Title>
                        <Card.Body>
                            <Container>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Container>
                        </Card.Body>
                        <Button className="custom-btn">Debate</Button>
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3">
                        <br></br>
                        <Card.Title className="text-center">Election Name</Card.Title>
                        <Card.Body>
                            <Container>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Container>
                        </Card.Body>
                        <Button className="custom-btn">Debate</Button>
                    </Card>
                </Col>
                <Col>
                    <Card className="mb-3">
                        <br></br>
                        <Card.Title className="text-center">Election Name</Card.Title>
                        <Card.Body>
                            <Container>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Container>
                        </Card.Body>
                        <Button className="custom-btn">Debate</Button>
                    </Card>
                </Col>
            </Row>
            <Pagination>
                <Pagination.Item>1</Pagination.Item>
                <Pagination.Item active>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
            </Pagination>
            <br></br>
        </Container >
    );
};
export default Debate;