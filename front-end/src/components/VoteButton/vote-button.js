import React, { useState, useRef } from 'react';
import { Button, Card, Form, Container, Col, Row, Modal } from 'react-bootstrap';
function VoteButton(ref) {
    const [show, setShow] = useState(false);

    function handleClose(ref) {
        setShow(false)
        const button = ref.current;
        console.log("ref", ref)
        button.disabled = false;
    }

    function handleShow(ref) {
        setShow(true);
        const button = ref.current;
        console.log(ref.current)
        button.disabled = true;
    }

    return (
        <>
            <Button variant="primary" style={{ margin: "10px" }} onClick={handleShow}>
                Vote
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Success! Your vote was recorded. ✅</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thanks for participating in this election. To view the results and breakdown, click below.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="gray-btn">
                        Return to Discussion
                    </Button>
                    <Button variant="primary" onClick={handleClose} className="yellow-btn">
                        View Results 📊
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default React.forwardRef(VoteButton)