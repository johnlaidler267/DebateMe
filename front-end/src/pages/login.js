import { useState, useEffect, useRef, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from '../components/Modal';
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AuthContext } from "../context/AuthProvider";

function Login() {
    const initialValues = { username: "", password: "" };
    const [ formValues, setFormValues ] = useState(initialValues);
    const [ formErrors, setFormErrors ] = useState({});
    const [ isSubmit, setIsSubmit ] = useState(false);
    const [ Loading, setLoading ] = useState(false);
    const [ IsOpen, setIsOpen ] = useState(false);
    const [ Content, setContent ] = useState("");
    const { setAuth }  = useContext(AuthContext);
    const Remember = useRef();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:4008/users/login', {
                username: formValues.username,
                password: formValues.password
            });
            
            const token = res.data.userId;
            sessionStorage.setItem('token', JSON.stringify(token));
            Remember.current.checked && localStorage.setItem('token', JSON.stringify(token));

            setTimeout(function() {
                setIsOpen(true);
                setContent(<div className="text-success text-center">You have successfully logged in!<br></br><CheckCircleIcon sx={{ fontSize: 150 }}/></div>);
                setTimeout(function() {
                    navigate(`/`);
                }, 2000);
            }, 1000);
        } catch (error) {
            setTimeout(function() {
                setIsOpen(true);
                setContent(<div className="text-danger">{error.response.data.error}</div>);
                setLoading(false);
            }, 1500);
        }
        
    }
    
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setLoading(true);
            handleLogin();
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

        if (!values.password) {
          errors.password = "Password is required!";
        } else {
          regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          if (!regex.test(values.password)) {
            errors.password = "Your password must contain minimum 8 characters, at least one letter, one number and one special character.";
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
            <Card className="mb-3 ps-4 pe-4 w-50 m-auto">
                <br></br>
                <Card.Title className="text-center">New Account</Card.Title>
                <Card.Body className="p-4">
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
                        </Row>

                        <Form.Group className="mb-3 d-flex justify-content-center">
                            <Form.Check
                                ref={Remember}
                                type="checkbox"
                                label="Remember Me"
                            />
                        </Form.Group>
                        <Button className="custom-btn w-100 p-2" type="submit">
                            {Loading ? <CircularProgress sx={{color: "black"}} size={30} /> : "Login"}
                        </Button>
                        <div className="text-center p-3">Don't have an account? <Link className="link" to="/sign-up">Sign up</Link></div>
                        <Modal open={IsOpen} onClose={() => setIsOpen(false)}>{Content}</Modal>
                    </Form>
                </Card.Body>
            </Card>
            <br></br>
        </Container>
    );
}

export default Login;