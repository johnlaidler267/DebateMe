import React, { useState, useRef } from 'react';
import { Button, Card, Form, Container, Col, Row, Modal } from 'react-bootstrap';
import "./vote.css";
import VoteButton from '../../components/VoteButton/vote-button';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from '@mui/material';

function MyVerticallyCenteredModal(props) {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [Thread, setThread] = useState();
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Congratulations! Your vote was recorded.
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    To view the results of the election, please click below.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={() => navigate('breakdown', { state: state })}>View Election Results</Button>
            </Modal.Footer>
        </Modal>
    );
}

const Vote = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [modalShow, setModalShow] = React.useState(false);
    console.log(state)
    return (
        <div className="App">
            <Container fluid style={{
                backgroundColor: '#393f4d',
                width: '75%',
            }}>
                <br></br>
                <Card className="mb-3">
                    <Button variant="outline-primary" style={{ width: "10%", margin: "10px" }} onClick={() => navigate(-1)}>Back</Button>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <Card>
                                        <h2 className="text-center" style={{ margin: "10px" }} >{state.candidate[0]}</h2>
                                        <Button className="tomato-btn" onClick={() => setModalShow(true)}>Vote</Button>
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <h2 className="text-center" style={{ margin: "10px" }}>{state.candidate[1]}</h2>
                                        <Button className="orange-btn" onClick={() => setModalShow(true)}>Vote</Button>
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
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