import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container, Card } from "react-bootstrap";

function Signup() {
    return (
        <Container fluid style={{
            backgroundColor: '#393f4d',
            width: '75%'
        }}>
            <br></br>
            <Card className="mb-3">
                <br></br>
                <Card.Title className="text-center">New Account</Card.Title>
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="confirm">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type="password" placeholder="Retype password" required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" min={1} max={120} placeholder="What's your age?" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select defaultValue="Choose..." required>
                                    <option disabled>Choose...</option>
                                    <option>Man</option>
                                    <option>Woman</option>
                                    <option>Others</option>
                                    <option>Prefer not to respond</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="race">
                                <Form.Label>Race</Form.Label>
                                <Form.Select defaultValue="Choose..." required>
                                    <option disabled>Choose...</option>
                                    <option>American Indian or Alaska Native</option>
                                    <option>Asian</option>
                                    <option>Black or African American</option>
                                    <option>Hispanic or Latino</option>
                                    <option>White</option>
                                    <option>Native Hawaiian or Other Pacific Islander</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Select defaultValue="Choose..." required>
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Select defaultValue="Choose..." required>
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control required />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <br></br>
        </Container>
    );
}

export default Signup;