import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { Card, Badge, Button, Dropdown, DropdownButton, Form, ListGroup } from 'react-bootstrap';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const FlightInsurance = (props) => {
    const { 
        drizzle,
        useCacheCall,
        useCacheEvents,
        useCacheSend 
    } = useDrizzle();

    const state = useDrizzleState(state => state); 

    const { FlightSuretyApp, FlightSuretyData } = drizzle.contracts;
    const { purchaseInsurance } = FlightSuretyApp.methods;
    const { PassengerInsuranceBought, FlightStatusInfo } = FlightSuretyApp.events;

    const [selectedFlight, setSelectedFlight] = useState();
    const [Amount, setAmount] = useState(0);

    const onSelectFlight = (e) => {
        const Flight = props.flights[e];
        setSelectedFlight(Flight);
    }

    const amountEnter = (e) => {
        setAmount(e.target.value);
    }

    const prettyDate = (ts) => {
        return new Date(ts * 1000).toDateString();
    }

    const onClickPurchase = () => {
        console.log(drizzle.web3.utils.toWei(Amount, 'ether'));
        purchaseInsurance.cacheSend(
            selectedFlight.airline,
            selectedFlight.flight,
            selectedFlight.timestamp,
            {
                from: state.accounts[0],
                value: drizzle.web3.utils.toWei(Amount.toString(), 'ether'),
                gas: 6700000
            }
        );
    } 

    useEffect(() => {
    });

    return (
        <>
        <Card>
        <Card.Img variant="top" src="http://bit.ly/2voJzqF" />
        <Card.Body>
        <Card.Title>Flights Data</Card.Title>
            <ListGroup>
                <div>{useCacheCall('FlightSuretyApp', 'getFlightsCount')}</div>
            </ListGroup> 
            <ListGroup> 
            <DropdownButton variant="success" id="dropdown-basic-button" title="Select Flight">
                {props.flights &&
                    props.flights.map((fltData, index) => {
                    return <Dropdown.Item 
                            key={fltData.timestamp ? fltData.timestamp : '0'}
                            eventKey={index}
                            onSelect={onSelectFlight}>
                                {index} - <Badge variant="primary">{fltData.flight}</Badge> - {prettyDate(fltData.timestamp)}
                            </Dropdown.Item>;
                })}
            </DropdownButton>
            </ListGroup> 
            { selectedFlight && 
                <>
            <ListGroup.Item>
                <Form noValidate>
                  <Form.Group>
                    <Form.Label>Ether:</Form.Label>
                    <Form.Control  placeholder="Max 1 ETH" type="number" value={Amount} onChange={amountEnter} />
                </Form.Group>
                </Form>
            </ListGroup.Item>
            <ListGroup.Item>
                {Amount} ETH for <Badge variant="success">{selectedFlight.flight}</Badge>
            </ListGroup.Item>
            <ListGroup.Item>
                <Button variant="primary" onClick={onClickPurchase}>Purchase</Button>
            </ListGroup.Item>
                </>
            }
        </Card.Body>
        <Card.Footer>
        </Card.Footer>
        </Card>
        </>
    );
}

export default FlightInsurance;
