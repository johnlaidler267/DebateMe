import "./debate.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Form, Container, Row, Col, Heading, Pagination, Badge } from 'react-bootstrap';
import { ClockHistory } from "react-bootstrap-icons";

const Debate = () => {
    const [ Threads, setThreads ] = useState([]);

    const fetchThreads = async () => {
        const res = await axios.get('http://localhost:4006/posts/all');
        setThreads(res.data);
      }

    useEffect(() => {
        fetchThreads();
    }, [])
    
    const renderedThreads = Object.values(Threads).map((t) => {
        return (
            <div 
                className='card'
                style={{ width: '30%', marginBottom: '20px' }}
                key={t.id}
            >
                <div className='card-body'>
                    <h3>{t.title}</h3>
                </div>
            </div>
        )
      })

    return (
        <Container fluid style={{
            backgroundColor: '#393f4d',
            width: '90%'
        }}>
            <br></br>
            <div style={{
                backgroundColor: '#393f4d'
            }}>
                <h2 style={{ color: "#feda6a" }}>
                    Debate of the Week.  <Badge bg="secondary" style={{ color: "#feda6a" }}>Hot 🔥</Badge>
                </h2>
            </div>
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
            {renderedThreads}
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