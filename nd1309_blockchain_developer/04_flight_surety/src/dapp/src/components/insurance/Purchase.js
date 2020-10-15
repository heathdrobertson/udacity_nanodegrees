import React, { useCallback, useState } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { Card, Badge, Button, Dropdown, DropdownButton, Form, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Purchased = (props) => {
        const { drizzle, useCacheEvents, useCacheSend } = drizzleReactHooks.useDrizzle();
        const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
                account: drizzleState.accounts[0]
        }))
        const { send, TXObjects } = useCacheSend('FlightSuretyApp', 'purchaseInsurance')

        const [selectedFlight, setSelectedFlight] = useState({flight: 'NONE', airline: 'NONE', timestamp: 'NONE'})
        const [amount, setAmount] = useState(0)
        const eventPassengerInsuranceBought = useCacheEvents('FlightSuretyApp', 'PassengerInsuranceBought')

        const StatusCodes = {
                0: 'UNKNOWN',
                10: 'ON_TIME',
                20: 'LATE_AIRLINE',
                30: 'LATE_WEATHER', 
                40: 'LATE_TECHNICAL',
                50: 'LATE_OTHER'
        }

        const prettyDate = (ts) => {
                return new Date(ts * 1000).toDateString();
        }

        const handleSelectFlight = (e) => {
                setSelectedFlight(props.flights[e])
                toast.success(props.flights[e].flight + " Selected")
        }

        return (
                <>
                <Card>
                <Card.Img variant="top" src="http://bit.ly/2voJzqF" />
                <Card.Body>
                <Card.Title>Purchase</Card.Title>
                <Card.Subtitle>Flight Delay Insurance</Card.Subtitle>
                </Card.Body>
                <ListGroup variant="flush">
                <ListGroup.Item>
                <DropdownButton variant="success" id="dropdown-basic-button" title="Select Flight">
                {props.flights &&
                        props.flights.map((flt, index) => {
                        return <Dropdown.Item 
                        key={flt.timestamp}
                        eventKey={index}
                        onSelect={handleSelectFlight}>
                                <Badge variant="primary">{flt.flight}</Badge> - {prettyDate(flt.timestamp)}
                                </Dropdown.Item>
                })}
                </DropdownButton>
                </ListGroup.Item>

                { selectedFlight != null &&
                <>
                <ListGroup.Item>
                <Form noValidate>
                <Form.Group>
                <Form.Label>Ether:</Form.Label>
                <Form.Control
                        placeholder="Max 1 ETH"
                        type="number"
                        value={amount}
                        onChange={(e) => { setAmount(e.target.value) }} 
                />
                </Form.Group>
                </Form>
                </ListGroup.Item>
                <ListGroup.Item>
                <Badge variant="primary">{ amount }</Badge> ETH for <Badge variant="primary">{ selectedFlight.flight }</Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                <Button variant="primary" onClick={
                        useCallback(() => send(
                            selectedFlight.airline,
                            selectedFlight.flight,
                            selectedFlight.timestamp,
                            {
                                from: drizzleState.account,
                                value: drizzle.web3.utils.toWei(amount.toString(), 'ether')
                            }))
                }>Purchase</Button>
                </ListGroup.Item>
                </>
                }
                </ListGroup>
                {TXObjects != 0 &&
                        TXObjects.map((TXObj, index) => {
                                if (TXObj &&  TXObj.hasOwnProperty('status') && TXObj.status == 'pending') {
                                        return <Card.Footer key={index}><Badge variant="warning">{ TXObj.status } { amount } ETH { selectedFlight.flight }</Badge></Card.Footer>
                                } else if (TXObj &&  TXObj.hasOwnProperty('status') && TXObj.status == 'success'){
                                        return <Card.Footer key={index}><Badge variant="success">{ TXObj.status } { amount } ETH { selectedFlight.flight }</Badge></Card.Footer>
                                }
                        })
                }
                </Card>
                </>
        )
}

export default Purchased
