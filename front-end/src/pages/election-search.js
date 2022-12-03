import React from "react";
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import { scryRenderedComponentsWithType } from "react-dom/test-utils";


const SearchElection = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'right',
      justifyContent: 'right',
      height: '100vh',
      paddingLeft: '30%',
    }}>
      <Container fluid style={{
        backgroundColor: '#393f4d'
      }}>
        <br></br>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formElectionName" >
                <Form.Control type="text" placeholder="Enter election name" />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Button variant="secondary" type="submit">Clear</Button>
          </Col>
        </Row>
      </Container >
    </div >
  );
};

export default SearchElection;
