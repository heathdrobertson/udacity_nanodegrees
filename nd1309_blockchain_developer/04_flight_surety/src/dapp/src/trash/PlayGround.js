import React, { useCallback } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { Card, Badge, Button, Dropdown, DropdownButton, Form, ListGroup } from 'react-bootstrap';


export default (props) => {
    const { 
        drizzle,
        useCacheCall,
        useCacheEvents,
        useCacheSend 
    } = drizzleReactHooks.useDrizzle();

    const state = drizzleReactHooks.useDrizzleState(state => ({
        account: state.accounts[0]
    }));

    state.flightCount = useCacheCall('FlightSuretyApp', 'getFlightsCount');

    const { send, TXObjects } = useCacheSend('FlightSuretyApp', 'setData');
    let data;
    return (
        <>
        <Card>
        <Card.Img variant="top" src="http://bit.ly/2xeFENK" />
        <Card.Body>

        <Card.Title>Data</Card.Title>

        <ListGroup>


        <ListGroup.Item>
            Data: {useCacheCall('FlightSuretyApp', 'getData')}
        </ListGroup.Item>

        <ListGroup.Item>
        <Form>
          <Form.Group>
            <Form.Label>Set Data:</Form.Label>
            <Form.Control as="input" value={data} onChange={(data) => {
                console.log(data)
            }} />
        </Form.Group>
        </Form>
        <Button variant="primary" onClick={
            (data) => {data}
        }>
          Submit
        </Button>
        </ListGroup.Item>
        <ListGroup.Item>
            { data }
        </ListGroup.Item>
        <ListGroup.Item>
            { state.flightCount }
        </ListGroup.Item>
        </ListGroup> 

        </Card.Body>
        <Card.Footer>
            Footer
        </Card.Footer>

        </Card>
        </>
    );
}

