import { useState } from "react";
import axios from "axios";
import { Button, Card, Container, Form } from "react-bootstrap";
import Modal from "../components/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const Messages = () => {
    const [ IsOpen, setIsOpen ] = useState(false);
    const [ Content, setContent ] = useState("");
    const navigate = useNavigate();

    const messageHandler = async (e) => {
        e.preventDefault();
        setIsOpen(true);
        setContent(<CircularProgress sx={{color: "yellow"}} size={60}/>);
        const { username } = e.target;
        try {
            const res = await axios.get(`http://users:4008/users/username/get?username=${username.value}`);

            navigate('inbox', { state: { userId: res.data.userId }});
        } catch (error) {
            setTimeout(function() {
                setIsOpen(true);
                setContent(<div className="text-danger">{error.response.data.error}</div>);
            }, 1500);
          }
    };

    return (
        <Form onSubmit={(e) => messageHandler(e)}>
            <Card className="m-5 text-center">
            <br></br>
            <Card.Title className="text-center ps-3 pe-3 pt-2 pb-1">Enter the user who you want to chat with</Card.Title>
            <Card.Body>
                <Container>
                    <Form.Group controlId="username">
                        <Form.Control type="text" placeholder="Enter the username" required />
                    </Form.Group>
                </Container>
            </Card.Body>
            <Button className="custom-btn" type="submit">Next</Button>
            <div className='top-50 start-50 position-absolute'>
                <Modal open={IsOpen} onClose={() => setIsOpen(false)}>{Content}</Modal>
            </div> 
            </Card>
        </Form>
    );
};

export default Messages;