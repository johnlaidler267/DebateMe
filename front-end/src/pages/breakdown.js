import React, { useState, useRef } from 'react';
import { Button, Card, Form, Container, Col, Row, Modal } from 'react-bootstrap';
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

    /* Hook that runs when the component is mounted, and is used to fetch the breakdown data */
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://votebreakdown:4009/getBreakdown', { params: { electionId: state.postId } });
            const { electionId, candidate0, candidate1 } = res.data;
            console.log("response", res)
            // setElectionId(electionId);
            // setCandidate0(candidate0);
            // setCandidate1(candidate1);
        }
        fetchData();
    }, []);

    // /* Returns the data for the race comparison chart */
    // const raceData = (cand0, cand1) => {
    //     const { numBlack0, numAsian0, numCaucasian0, numHispanic0, numOther0, totalVotes0 } = cand0;
    //     const { numBlack1, numAsian1, numCaucasian1, numHispanic1, numOther1, totalVotes1 } = cand1;

    //     let dataRaceA = [
    //         { x: "Black", y: numBlack0 / (numBlack0 + numBlack1) },
    //         { x: "Asian", y: numAsian0 / (numAsian0 + numAsian1) },
    //         { x: "Caucasian", y: numCaucasian0 / (numCaucasian0 + numCaucasian1) },
    //         { x: "Hispanic", y: numHispanic0 / (numHispanic0 + numHispanic1) },
    //         { x: "Other", y: numOther0 / (numOther0 + numOther1) },
    //     ];

    //     let dataRaceB = dataRaceA.map((point) => {
    //         const y = Math.round(point.y + 3 * (Math.random() - 0.5));
    //         return { ...point, y };
    //     });

    //     return dataRaceA, dataRaceB;
    // }

    // /* Returns the data for the gender comparison chart */
    // const genderData = (cand0, cand1) => {
    //     const { numMen0, numWomen0, numOther0, totalVotes0 } = cand0;
    //     const { numMen1, numWomen1, numOther1, totalVotes1 } = cand1;

    //     let dataGenderA = [
    //         { x: "Men", y: numMen0 / (numMen0 + numMen1) },
    //         { x: "Women", y: numWomen0 / (numWomen0 + numWomen1) },
    //         { x: "Other", y: numOther0 / (numOther0 + numOther1) },
    //     ];

    //     let dataGenderB = dataGenderA.map((point) => {
    //         const y = Math.round(point.y + 3 * (Math.random() - 0.5));
    //         return { ...point, y };
    //     });
    //     return dataGenderA, dataGenderB;
    // }

    // /* Returns the data for the age comparison chart */
    // const ageData = (cand0, cand1) => {
    //     const { numUnder25_0, num25_65_0, numOver65_0, totalVotes0 } = cand0;
    //     const { numUnder25_1, num25_65_1, numOver65_1, totalVotes1 } = cand1;
    //     let dataAgeA = [
    //         { x: "<25", y: numUnder25_0 / (numUnder25_0 + numUnder25_1) },
    //         { x: "25-65", y: num25_65_0 / (num25_65_0 + num25_65_1) },
    //         { x: "65+", y: numOver65_0 / (numOver65_0 + numOver65_1) },
    //     ];

    //     let dataAgeB = dataAgeA.map((point) => {
    //         const y = Math.round(point.y + 3 * (Math.random() - 0.5));
    //         return { ...point, y };
    //     });
    //     return dataAgeA, dataAgeB;
    // }

    // /* Gather the data for the charts */
    // const width = 300;
    // const height = 150;
    // let dataAgeA, dataAgeB = ageData(candidate0, candidate1);
    // let dataGenderA, dataGenderB = genderData(candidate0, candidate1);
    // let dataRaceA, dataRaceB = raceData(candidate0, candidate1);

    return (
        <div className="App">
            <Container fluid style={{
                backgroundColor: '#393f4d',
                width: '95%',
            }}>
                <br></br>
                <Card>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <h3 className='text-center'> {state.candidate[0]} ✅</h3>
                                            <h5 className='text-center'> Total Votes: {candidate0.voteCount} </h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <h3 className='text-center'> {state.candidate[1]} </h3>
                                            <h5 className='text-center'> Total Votes: {candidate1.voteCounts} </h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container >
                        <br></br>
                        <Row>
                            <Card id="race" style={{ height: "75%", width: "85%", margin: "auto" }}>
                                <br></br>
                                <h4 className="text-center">Racial Breakdown</h4>
                                {/* <VictoryChart horizontal
                                    height={170}
                                    width={width}
                                    padding={30}
                                >
                                    <VictoryStack
                                        style={{ data: { width: 15 }, labels: { fontSize: 5 } }}
                                    >
                                        <VictoryBar
                                            style={{ data: { fill: "tomato" } }}
                                            data={dataRaceA}
                                            y={(data) => (-Math.abs(data.y))}
                                            labels={({ datum }) => (`${Math.abs(datum.y)} % `)}
                                        />
                                        <VictoryBar
                                            style={{ data: { fill: "orange" } }}
                                            data={dataRaceB}
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
                                        tickValues={dataRaceA.map((point) => point.x).reverse()}
                                    />
                                </VictoryChart> */}
                            </Card>
                        </Row>
                        <br></br>
                        <Row>
                            <Card id="gender" style={{ height: "75%", width: "85%", margin: "auto" }}>
                                <br></br>
                                <h4 className="text-center">Gender Breakdown</h4>

                                {/* <VictoryChart horizontal
                                    height={100}
                                    width={width}
                                    padding={20}
                                >
                                    <VictoryStack
                                        style={{ data: { width: 15 }, labels: { fontSize: 5 } }}
                                    >
                                        <VictoryBar
                                            style={{ data: { fill: "tomato" } }}
                                            data={dataGenderA}
                                            y={(data) => (-Math.abs(data.y))}
                                            labels={({ datum }) => (`${Math.abs(datum.y)} % `)}
                                        />
                                        <VictoryBar
                                            style={{ data: { fill: "orange" } }}
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
                                </VictoryChart> */}

                            </Card>
                        </Row>
                        <br></br>
                        <Row>
                            <Card id="age" style={{ height: "75%", width: "85%", margin: "auto" }} >
                                <br></br>
                                <h4 className="text-center">Age Breakdown</h4>

                                {/* <VictoryChart horizontal
                                    height={100}
                                    width={width}
                                    padding={20}
                                >
                                    <VictoryStack
                                        style={{ data: { width: 15 }, labels: { fontSize: 5 } }}
                                    >
                                        <VictoryBar
                                            style={{ data: { fill: "tomato" } }}
                                            data={dataAgeA}
                                            y={(data) => (-Math.abs(data.y))}
                                            labels={({ datum }) => (`${Math.abs(datum.y)} % `)}
                                        />
                                        <VictoryBar
                                            style={{ data: { fill: "orange" } }}
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
                                </VictoryChart> */}

                            </Card>
                        </Row>
                    </Card.Body>
                    <Button variant="outline-secondary" style={{ width: "10%", margin: "10px" }} onClick={() => navigate(-2)}>Back To Debate</Button>
                </Card>
            </Container>
        </div >
    );
}

export default Breakdown;