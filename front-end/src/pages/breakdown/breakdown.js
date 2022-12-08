import React, { useState, useRef } from 'react';
import { Button, Card, Form, Container, Col, Row, Modal } from 'react-bootstrap';
import {
    VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme, VictoryPie, VictoryLabel, VictoryStack
} from 'victory';
import MapChart from "./MapChart";

const dataRaceA = [
    { x: "Black", y: 57 },
    { x: "Asian", y: 40 },
    { x: "Caucasian", y: 38 },
    { x: "Hispanic", y: 37 },
    { x: "Other", y: 25 },
];

const dataRaceB = dataRaceA.map((point) => {
    const y = Math.round(point.y + 3 * (Math.random() - 0.5));
    return { ...point, y };
});

const dataGenderA = [
    { x: "Men", y: 57 },
    { x: "Women", y: 40 },
    { x: "Other", y: 38 },
];

const dataGenderB = dataGenderA.map((point) => {
    const y = Math.round(point.y + 3 * (Math.random() - 0.5));
    return { ...point, y };
});

const dataAgeA = [
    { x: "<25", y: 57 },
    { x: "25-65", y: 40 },
    { x: "65+", y: 38 },
];

const dataAgeB = dataAgeA.map((point) => {
    const y = Math.round(point.y + 3 * (Math.random() - 0.5));
    return { ...point, y };
});

const width = 300;
const height = 150;

const Breakdown = () => {
    const c1 = useRef(null)
    const c2 = useRef(null)
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
                                            <h3 className='text-center'> Candidate 1 ✅</h3>
                                            <h5 className='text-center'> Total Votes: 233 </h5>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <h3 className='text-center'> Candidate 2 </h3>
                                            <h5 className='text-center'> Total Votes: 200 </h5>
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
                                <VictoryChart horizontal
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
                                            labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
                                        />
                                        <VictoryBar
                                            style={{ data: { fill: "orange" } }}
                                            data={dataRaceB}
                                            labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
                                        />
                                    </VictoryStack>

                                    <VictoryAxis
                                        style={{
                                            axis: { stroke: "transparent" },
                                            ticks: { stroke: "transparent" },
                                            tickLabels: { fontSize: 5, fill: "black" }
                                        }}
                                        /*
                                          Use a custom tickLabelComponent with
                                          an absolutely positioned x value to position
                                          your tick labels in the center of the chart. The correct
                                          y values are still provided by VictoryAxis for each tick
                                        */
                                        tickLabelComponent={
                                            <VictoryLabel
                                                x={width / 2}
                                                textAnchor="middle"
                                            />
                                        }
                                        tickValues={dataRaceA.map((point) => point.x).reverse()}
                                    />
                                </VictoryChart>
                            </Card>
                        </Row>
                        <br></br>
                        <Row>
                            <Card id="gender" style={{ height: "75%", width: "85%", margin: "auto" }}>
                                <br></br>
                                <h4 className="text-center">Gender Breakdown</h4>
                                <VictoryChart horizontal
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
                                            labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
                                        />
                                        <VictoryBar
                                            style={{ data: { fill: "orange" } }}
                                            data={dataGenderB}
                                            labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
                                        />
                                    </VictoryStack>

                                    <VictoryAxis
                                        style={{
                                            axis: { stroke: "transparent" },
                                            ticks: { stroke: "transparent" },
                                            tickLabels: { fontSize: 5, fill: "black" }
                                        }}
                                        /*
                                          Use a custom tickLabelComponent with
                                          an absolutely positioned x value to position
                                          your tick labels in the center of the chart. The correct
                                          y values are still provided by VictoryAxis for each tick
                                        */
                                        tickLabelComponent={
                                            <VictoryLabel
                                                x={width / 2}
                                                textAnchor="middle"
                                            />
                                        }
                                        tickValues={dataGenderA.map((point) => point.x).reverse()}
                                    />
                                </VictoryChart>
                            </Card>
                        </Row>
                        <br></br>
                        <Row>
                            <Card id="age" style={{ height: "75%", width: "85%", margin: "auto" }} >
                                <br></br>
                                <h4 className="text-center">Age Breakdown</h4>
                                <VictoryChart horizontal
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
                                            labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
                                        />
                                        <VictoryBar
                                            style={{ data: { fill: "orange" } }}
                                            data={dataAgeB}
                                            labels={({ datum }) => (`${Math.abs(datum.y)}%`)}
                                        />
                                    </VictoryStack>

                                    <VictoryAxis
                                        style={{
                                            axis: { stroke: "transparent" },
                                            ticks: { stroke: "transparent" },
                                            tickLabels: { fontSize: 5, fill: "black" }
                                        }}
                                        /*
                                          Use a custom tickLabelComponent with
                                          an absolutely positioned x value to position
                                          your tick labels in the center of the chart. The correct
                                          y values are still provided by VictoryAxis for each tick
                                        */
                                        tickLabelComponent={
                                            <VictoryLabel
                                                x={width / 2}
                                                textAnchor="middle"
                                            />
                                        }
                                        tickValues={dataAgeA.map((point) => point.x).reverse()}
                                    />
                                </VictoryChart>
                            </Card>
                        </Row>
                    </Card.Body>
                    <Button variant="outline-secondary" style={{ width: "10%", margin: "10px" }}>Back To Debate</Button>
                </Card>
            </Container>
        </div >
    );
}

export default Breakdown;