import React, { useState, useRef } from 'react';
import { Button, Card, Form, Container, Col, Row, Accordion } from 'react-bootstrap';
import {
    VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme, VictoryPie, VictoryLabel, VictoryStack
} from 'victory';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from 'react';

/* Render the breakdown page */
const Breakdown = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    /* State variables for the data (state variables are used to rerender the component when the data changes) */
    const [electionId, setElectionId] = useState({});
    const [candidate0, setCandidate0] = useState({});
    const [candidate1, setCandidate1] = useState({});
    const [dataRaceA, setDataRaceA] = useState([]);
    const [dataRaceB, setDataRaceB] = useState([]);
    const [dataGenderA, setDataGenderA] = useState([]);
    const [dataGenderB, setDataGenderB] = useState([]);
    const [dataAgeA, setDataAgeA] = useState([]);
    const [dataAgeB, setDataAgeB] = useState([]);

    /* Hook that runs when the component is mounted, and is used to fetch the breakdown data */
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:4009/getBreakdown', { params: { electionID: state.postId } });
            let { electionid, candidate0, candidate1 } = res.data;
            candidate0 = candidate0.replace(/[{()}]/g, '').split(",");
            candidate1 = candidate1.replace(/[{()}]/g, '').split(",");
            setElectionId(electionId);
            setCandidate0(candidate0);
            setCandidate1(candidate1);
            setDataRaceA(raceData(candidate0, candidate1)[0]);
            setDataRaceB(raceData(candidate0, candidate1)[1]);
            setDataGenderA(genderData(candidate0, candidate1)[0]);
            setDataGenderB(genderData(candidate0, candidate1)[1]);
            setDataAgeA(ageData(candidate0, candidate1)[0]);
            setDataAgeB(ageData(candidate0, candidate1)[1]);
        }
        fetchData();
    }, []);

    /* Returns the data for the race comparison chart */
    const raceData = (cand0, cand1) => {

        let dataRaceA = [
            { x: "Black", y: Math.round((cand0[5] / (parseInt(cand0[5]) + parseInt(cand1[5]))) * 100) || 50 },
            { x: "Asian", y: Math.round((cand0[6] / (parseInt(cand0[6]) + parseInt(cand1[6]))) * 100) || 50 },
            { x: "Caucasian", y: Math.round((cand0[7] / (parseInt(cand0[7]) + parseInt(cand1[7]))) * 100) || 50 },
            { x: "Hispanic", y: Math.round((cand0[8] / (parseInt(cand0[8]) + parseInt(cand1[8]))) * 100) || 50 },
            { x: "Other", y: Math.round((cand0[9] / (parseInt(cand0[9]) + parseInt(cand1[9]))) * 100) || 50 },
        ];

        let dataRaceB = dataRaceA.map((point) => {
            const y = Math.round(100 - point.y);
            return { ...point, y };
        });

        return [dataRaceA, dataRaceB];
    }

    /* Returns the data for the gender comparison chart */
    const genderData = (cand0, cand1) => {
        let dataGenderA = [
            { x: "Men", y: Math.round(parseInt(cand0[11]) / (parseInt(cand0[11]) + parseInt(cand1[11])) * 100) || 50 },
            { x: "Women", y: Math.round(parseInt(cand0[12]) / (parseInt(cand0[12]) + parseInt(cand1[12])) * 100) || 50 },
            { x: "Other", y: Math.round(parseInt(cand0[13]) / (parseInt(cand0[13]) + parseInt(cand1[13])) * 100) || 50 },
        ];

        let dataGenderB = dataGenderA.map((point) => {
            const y = Math.round(100 - point.y);
            return { ...point, y };
        });
        return [dataGenderA, dataGenderB];
    }

    /* Returns the data for the age comparison chart */
    const ageData = (cand0, cand1) => {
        let dataAgeA = [
            { x: "<25", y: Math.round(parseInt(cand0[2]) / (parseInt(cand0[2]) + parseInt(cand1[2])) * 100) || 50 },
            { x: "25-65", y: Math.round(parseInt(cand0[3]) / (parseInt(cand0[3]) + parseInt(cand1[3])) * 100) || 50 },
            { x: "65+", y: Math.round(parseInt(cand0[4]) / (parseInt(cand0[4]) + parseInt(cand1[4])) * 100) || 50 },
        ];

        let dataAgeB = dataAgeA.map((point) => {
            const y = Math.round(100 - point.y);
            return { ...point, y };
        });
        return [dataAgeA, dataAgeB];
    }

    // /* Gather the data for the charts */
    const width = 300;
    const height = 150;

    return (
        <div className="App">
            <Container fluid style={{
                backgroundColor: '#393f4d',
                width: '95%',
            }}>
                <br></br>
                <Card>
                    <Card.Header>
                        <h2 className='text-center'> Election Breakdown </h2>
                    </Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <Card className="border d-flex align-items-center justify-content-center" style={{ height: '100%', backgroundImage: "linear-gradient(to left top, #FF4040, #800000)", color: "white" }}>

                                        <Card.Body>
                                            <h3 className='text-center'> {state.candidate[0]} ✅</h3>
                                            <h5 className='text-center m-0 mb-2' style={{ color: "white" }}> Total Votes: {candidate0[1]} </h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card className="border d-flex align-items-center justify-content-center" style={{ height: '100%', backgroundImage: "linear-gradient(to right top, #3F3FFF, #000080", color: "white" }}>

                                        <Card.Body>
                                            <h3 className='text-center'> {state.candidate[1]} </h3>
                                            <h5 className='text-center m-0 mb-2' style={{ color: "white" }}> Total Votes: {candidate1[1]} </h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                        <br></br>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0" id="race" style={{ height: "75%", width: "85%", margin: "auto" }}>
                                <Accordion.Header><h4 className="text-center">Racial Breakdown</h4></Accordion.Header>
                                <Accordion.Body>
                                    <VictoryChart horizontal
                                        height={170}
                                        width={width}
                                        padding={30}
                                    >
                                        <VictoryStack
                                            style={{ data: { width: 18, }, labels: { fontSize: 5 } }}
                                        >
                                            <VictoryBar
                                                style={{ data: { fill: "#FF4040", color: "white" } }}
                                                data={dataRaceA}
                                                y={(data) => (-Math.abs(data.y))}
                                                labels={({ datum }) => (`${Math.abs(datum.y)} % `)}
                                            />
                                            <VictoryBar
                                                style={{ data: { fill: "#3F3FFF" } }}
                                                data={dataRaceB}
                                                labels={({ datum }) => (`${Math.abs(datum.y)} % `)}
                                            />
                                        </VictoryStack>

                                        <VictoryAxis
                                            style={{
                                                axis: { stroke: "transparent" },
                                                ticks: { stroke: "transparent" },
                                                tickLabels: { fontSize: 5, fill: "white" }
                                            }}
                                            tickLabelComponent={
                                                <VictoryLabel
                                                    x={width / 2}
                                                    textAnchor="middle"
                                                />
                                            }
                                            tickValues={dataRaceA.map((point) => point.x).reverse()}
                                        />
                                    </VictoryChart>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='1' id="gender" style={{ height: "75%", width: "85%", margin: "auto" }}>
                                <Accordion.Header>
                                    <h4 className="text-center">Gender Breakdown</h4>
                                </Accordion.Header>

                                <Accordion.Body>
                                    <VictoryChart horizontal
                                        height={100}
                                        width={width}
                                        padding={20}
                                    >
                                        <VictoryStack
                                            style={{ data: { width: 15 }, labels: { fontSize: 5 } }}
                                        >
                                            <VictoryBar
                                                style={{ data: { fill: "#FF4040", color: "white" } }}
                                                data={dataGenderA}
                                                y={(data) => (-Math.abs(data.y))}
                                                labels={({ datum }) => (`${Math.abs(datum.y)} % `)}
                                            />
                                            <VictoryBar
                                                style={{ data: { fill: "#3F3FFF" } }}
                                                data={dataGenderB}
                                                labels={({ datum }) => (`${Math.abs(datum.y)} % `)}
                                            />
                                        </VictoryStack>

                                        <VictoryAxis
                                            style={{
                                                axis: { stroke: "transparent" },
                                                ticks: { stroke: "transparent" },
                                                tickLabels: { fontSize: 5, fill: "black" }
                                            }}
                                            tickLabelComponent={
                                                <VictoryLabel
                                                    x={width / 2}
                                                    textAnchor="middle"
                                                />
                                            }
                                            tickValues={dataGenderA.map((point) => point.x).reverse()}
                                        />
                                    </VictoryChart>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='3' id="age" style={{ height: "75%", width: "85%", margin: "auto" }} >
                                <Accordion.Header>
                                    <h4 className="text-center">Age Breakdown</h4>
                                </Accordion.Header>

                                <Accordion.Body>
                                    <VictoryChart horizontal
                                        height={100}
                                        width={width}
                                        padding={20}
                                    >
                                        <VictoryStack
                                            style={{ data: { width: 15 }, labels: { fontSize: 5 } }}
                                        >
                                            <VictoryBar
                                                style={{ data: { fill: "#FF4040", color: "white" } }}
                                                data={dataAgeA}
                                                y={(data) => (-Math.abs(data.y))}
                                                labels={({ datum }) => (`${Math.abs(datum.y)} % `)}
                                            />
                                            <VictoryBar
                                                style={{ data: { fill: "#3F3FFF" } }}
                                                data={dataAgeB}
                                                labels={({ datum }) => (`${Math.abs(datum.y)} % `)}
                                            />
                                        </VictoryStack>

                                        <VictoryAxis
                                            style={{
                                                axis: { stroke: "transparent" },
                                                ticks: { stroke: "transparent" },
                                                tickLabels: { fontSize: 5, fill: "black" }
                                            }}
                                            tickLabelComponent={
                                                <VictoryLabel
                                                    x={width / 2}
                                                    textAnchor="middle"
                                                />
                                            }
                                            tickValues={dataAgeA.map((point) => point.x).reverse()}
                                        />
                                    </VictoryChart>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                    <Card.Footer>
                        <Button className="btn-secondary" onClick={() => navigate(`/post/${state.postId}`)}>Back To Debate</Button>
                    </Card.Footer>
                </Card>

            </Container>
        </div >
    );
}

export default Breakdown;