import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container, Card } from "react-bootstrap";

function Signup() {
    const initialValues = { username: "", email: "", password: "", confirmPassword: "", age: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
      };
    
      useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          console.log(formValues);
        }
      }, [formErrors]);

      const validate = (values) => {
        const errors = {};
        let regex;
        if (!values.username) {
            errors.username = "Username is required!";
        } else {
            regex = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
            if (!regex.test(values.username)) {
                errors.username = "Your username must be between 8-20 characters.";
            }
        }

        if (!values.email) {
          errors.email = "Email is required!";
        } else {
          regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          if (!regex.test(values.email)) {
              errors.email = "This is not a valid email format!";
          }
        }

        if (!values.password) {
          errors.password = "Password is required";
        } else {
          regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          if (!regex.test(values.password)) {
            errors.password = "Your password must contain minimum 8 characters, at least one letter, one number and one special character.";
          }
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Password confirmation is required";
        } else {
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "The password confirmation does not match."
            }
        }

        if (!values.age) {
            errors.age = "Your age is required";
        } else {
            if (!(values.age > 0)) {
                errors.age = "Your age must be equal or more than 1!";
            }
        }

        return errors;
      };

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
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter username" 
                                    value={formValues.username}
                                    onChange={handleChange}
                                />
                                <p className="form-error">{formErrors.username}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                />
                                <p className="form-error">{formErrors.email}</p>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                />
                                <p className="form-error">{formErrors.password}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="confirmPassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Retype password"
                                    value={formValues.confirmPassword}
                                    onChange={handleChange}
                                />
                                <p className="form-error">{formErrors.confirmPassword}</p>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="What's your age?"
                                    value={formValues.age}
                                    onChange={handleChange}
                                    required 
                                />
                                <p className="form-error">{formErrors.age}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select defaultValue="Choose..." required>
                                    <option disabled>Choose...</option>
                                    <option>Man</option>
                                    <option>Woman</option>
                                    <option>Non-binary</option>
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
                                <Form.Select defaultValue="Choose..." required>
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
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