import "./debate.css"
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Card, Container, Row, Col, Pagination, Badge } from 'react-bootstrap';

const Debate = () => {
    const [Threads, setThreads] = useState([]);
    const navigate = useNavigate();

    const fetchThreads = async () => {
        const res = await axios.get('http://threads:4006/posts/all');
        setThreads(shuffle(res.data));
    }

    /* Shuffles the threads */
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    /* Renders the threads */
    const renderedThreads = Object.values(Threads).map((t, index) => {
        return (
            <Card className="mb-2" key={index}>
                <br></br>
                <Card.Title className="text-center ps-3 pe-3 pt-2 pb-1">{t.title}</Card.Title>
                <Card.Body>
                    <Container>
                        <p>{t.content}</p>
                    </Container>
                </Card.Body>
                <Button onClick={() => postHandler(t.postId)} className="custom-btn">Debate</Button>
            </Card>
        );
    });

    const postHandler = (postId) => {
        navigate(`/post/${postId}`);
    }

    useEffect(() => {
        fetchThreads();
    }, [])

    return (
        <Container fluid style={{
            backgroundColor: '#393f4d',
            width: '90%'
        }}>
            <br></br>
            <div>
                <h3 style={{ color: "#feda6a" }}>
                    Explore Debates.
                </h3>
            </div>
            <div className="threads">
                {renderedThreads}
            </div>
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