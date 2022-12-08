import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Signup() {
    const initialValues = { username: "", email: "", password: "", confirmPassword: "", age: "", gender: "Choose...", race: "Choose...", country: "Choose...", state: "Choose...", city: "Choose..." };
    const [ formValues, setFormValues ] = useState(initialValues);
    const [ formErrors, setFormErrors ] = useState({});
    const [ isSubmit, setIsSubmit ] = useState(false);
    const [ Countries, setCountries ] = useState([]);
    const [ States, setStates ] = useState([]);
    const [ Cities, setCities ] = useState([]);
    const [ Loading, setLoading ] = useState(false);
    const navigate = useNavigate();


    const fetchCountries = async () => {
        const res = await axios.get("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json").catch((err) => {
            console.log(err.message);
        });
        setCountries(res.data);
    }

      const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
      };
    
      const handleCountry = (e) => {
        const countryId = e.target.value;
        const country = Countries.find((country) => country.id.toString() === countryId);
        let states = country.states;
        if (states.length === 0) {
            states.push({ id: 1, name: country.name, cities: [{ id: 1, name: country.name }] });
        }
        setStates(states);
      }

      const handleState = (e) => {
        const stateId = e.target.value;
        const state = States.find((state) => state.id.toString() === stateId);
        let cities = state.cities;
        if (cities.length === 0) {
            cities.push({ name: state.name });
        }
        setCities(cities);
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    
    useEffect(() => {
        fetchCountries();
    }, []);
    
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setLoading(true);
            setTimeout(function() {
                navigate(`/`);
            }, 1000);
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
          errors.password = "Password is required!";
        } else {
          regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
          if (!regex.test(values.password)) {
            errors.password = "Your password must contain minimum 8 characters, at least one letter, one number and one special character.";
          }
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Password confirmation is required!";
        } else {
            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "The password confirmation does not match."
            }
        }

        if (!values.age) {
            errors.age = "Age is required!";
        } else {
            if (!(values.age > 0)) {
                errors.age = "Your age must be equal or more than 1!";
            }
        }

        if (values.gender === "Choose...") {
            errors.gender = "Gender is required!";
        }

        if (values.race === "Choose...") {
            errors.race = "Race is required!";
        }

        if (values.country === "Choose...") {
            errors.country = "Country is required!";
        }

        if (values.state === "Choose...") {
            errors.state = "State/Province is required!";
        }

        if (values.city === "Choose...") {
            errors.city = "City is required!";
        }

        return errors;
      };

    return (
        <Container fluid style={{
            backgroundColor: '#393f4d',
            width: '75%'
        }}>
            <br></br>
            <Card className="mb-3 ps-4 pe-4">
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
                                />
                                <p className="form-error">{formErrors.age}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select
                                    value={formValues.gender}
                                    onChange={handleChange}
                                >
                                    <option disabled>Choose...</option>
                                    <option>Man</option>
                                    <option>Woman</option>
                                    <option>Non-binary</option>
                                    <option>Prefer not to respond</option>
                                </Form.Select>
                                <p className="form-error">{formErrors.gender}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="race">
                                <Form.Label>Race</Form.Label>
                                <Form.Select
                                    value={formValues.race}
                                    onChange={handleChange}
                                >
                                    <option disabled>Choose...</option>
                                    <option>American Indian or Alaska Native</option>
                                    <option>Asian</option>
                                    <option>Black or African American</option>
                                    <option>Hispanic or Latino</option>
                                    <option>White</option>
                                    <option>Native Hawaiian or Other Pacific Islander</option>
                                </Form.Select>
                                <p className="form-error">{formErrors.race}</p>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Select 
                                    value={formValues.country}
                                    onChange={(e) => {handleChange(e); handleCountry(e)}}
                                >
                                    <option disabled>Choose...</option>
                                    {
                                        Countries.map((country) => { return (
                                            <option 
                                                key={country.id}
                                                value={country.id}
                                            >
                                                {country.name}
                                            </option>
                                        )})
                                    }
                                </Form.Select>
                                <p className="form-error">{formErrors.country}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="state">
                                <Form.Label>State/Province</Form.Label>
                                <Form.Select 
                                    value={formValues.state}
                                    onChange={(e) => {handleChange(e); handleState(e)}}
                                >
                                    <option disabled>Choose...</option>
                                    {
                                        States.map((state) => { return (
                                            <option 
                                                key={state.id}
                                                value={state.id}
                                            >
                                                {state.name}
                                            </option>
                                        )})
                                    }
                                </Form.Select>
                                <p className="form-error">{formErrors.state}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Select
                                    value={formValues.city}
                                    onChange={handleChange}
                                >
                                    <option disabled>Choose...</option>
                                    {
                                        Cities.map((city) => { if (!city.id) {
                                            city.id = 1;
                                        }  return (
                                            <option 
                                                key={city.id}
                                                value={city.id}
                                            >
                                                {city.name}
                                            </option>
                                        )})
                                    }
                                </Form.Select>
                                <p className="form-error">{formErrors.city}</p>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3 d-flex justify-content-center" id="formGridCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button className="custom-btn w-100 p-2" type="submit">
                            {Loading ? <CircularProgress sx={{color: "black"}} size={30} /> : "Submit"}
                        </Button>
                        <div className="text-center p-3">Already a member? <Link className="link" to="/login">Log In</Link></div>
                    </Form>
                </Card.Body>
            </Card>
            <br></br>
        </Container>
    );
}

export default Signup;