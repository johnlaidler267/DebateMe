import "./debate.css"
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button, Card, Container, Pagination, Carousel, Badge } from 'react-bootstrap';
import { AiOutlineFire } from 'react-icons/ai';

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
            <Card className="mb-3" key={index} style={{ padding: "0px 5px 5px 5px !important", marginTop: "0px !important" }}>
                <br></br>
                <Card.Header>
                    <Card.Title className="text-center ps-3 pe-3 pt-2 pb-1">{t.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Container>
                        <p>{t.content}</p>
                    </Container>
                </Card.Body>
                <Button style={{ border: "7px black !important" }} onClick={() => postHandler(t.postId)} className="custom-btn">Debate</Button>
            </Card>
        );
    });

    const postHandler = (postId) => {
        navigate(`/post/${postId}`);
    }

    useEffect(() => {
        fetchThreads();
    }, [])

    const debates = Object.values(Threads);
    const CustomCarousel = () => {
        let featured = []
        let featuredTitles = new Set();

        const getRandomDebate = (debates) => {
            let debate = debates[Math.floor(Math.random() * debates.length)];

            while (featuredTitles.has(debate.title))
                debate = debates[Math.floor(Math.random() * debates.length)];

            return debate
        }

        for (let i = 0; i < 4; i++) {
            if (debates.length < 1) break;

            if (debates.length < i + 1) break;
            else {
                const debate = getRandomDebate(debates)
                const postId = debate.postId;
                const title = debate.title;
                let content = debate.content;
                if (content.length > 200) content = content.substring(0, 200) + "...";
                featuredTitles.add(title)
                featured.push(
                    <Carousel.Item key={title}>
                        <Card style={{ width: "100%", height: "20rem", color: "black", padding: "5px" }}>
                            <Card.Body>
                                <Carousel.Caption>
                                    <h3>{title}</h3>
                                    <p>{content}</p>
                                    <br></br>
                                    <Button style={{ width: "70%" }} onClick={() => navigate(`/post/${postId}`)} className="custom-btn">Debate</Button>
                                    <br></br>
                                    <br></br>
                                </Carousel.Caption>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                );
            }
        }
        return (
            <Carousel variant="dark">
                {featured}
            </Carousel>
        )
    }


    return (

        < Container fluid style={{
            backgroundColor: '#393f4d',
            width: '90%'
        }
        }>
            <br></br>
            <div>
                <h3 style={{ color: "#feda6a" }}>
                    Featured Debates. <Badge bg="secondary">Hot <AiOutlineFire /></Badge>
                </h3>
            </div>
            <CustomCarousel />
            <br></br>
            <div>
                <h3 style={{ color: "#feda6a" }}>
                    Explore Debates.
                </h3>
            </div>
            <div className="threads">
                {renderedThreads}
            </div>
            <br></br>
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