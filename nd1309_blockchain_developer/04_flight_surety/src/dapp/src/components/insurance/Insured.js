import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { Card, Badge, Button, ListGroup, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';

import {useGetFlightsData} from '../Flights.js'

const Claim = (props) => {
        const { useCacheSend } = drizzleReactHooks.useDrizzle();
        const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
                account: drizzleState.accounts[0]
        }))
        const { send, TXObjects } = useCacheSend( 'FlightSuretyApp', 'claimInsurance')

        const flights = useGetFlightsData()

        const handleClaim = (e) => {
                let flt = flights[e.target.value]
                toast.success("Fliling claim for... " + flt.flight)
                send(flt.airline, flt.flight, flt.timestamp, {from: drizzleState.account})
        }
        
        return (
                <>
                <Button variant="outline-danger" size="sm" value={props.index} onClick={handleClaim}>Claim</Button>
                </>
        )
}

const StatusUpdate = (props) => {
        const { useCacheSend } = drizzleReactHooks.useDrizzle();
        const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
                account: drizzleState.accounts[0]
        }))
        const {send, TXObjects} = useCacheSend('FlightSuretyApp', 'fetchFlightStatus')

        const flights = useGetFlightsData()

        const handleStatusUpdate = (e) => {
                let flt = flights[e.target.value]
                send(flt.airline, flt.flight, flt.timestamp, {from: drizzleState.account})
                toast.success("Checking Status of... " + flt.flight)
        }
        
        return (
                <>
                <Button variant="outline-info" size="sm" value={props.index} onClick={handleStatusUpdate}>Status</Button>
                </>
        )
}

const InsuredFlights = (props) => {
        const { drizzle, useCacheCall, useCacheEvents, useCacheSend } = drizzleReactHooks.useDrizzle();

        const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
                account: drizzleState.accounts[0]
        }))

        const StatusCodes = {
                0: 'UNKNOWN',
                10: 'ON TIME',
                20: 'LATE AIRLINE',
                30: 'LATE WEATHER',
                40: 'LATE TECHNICAL',
                50: 'LATE OTHER'
        }

        const ClaimCodes = ['20']

        const ETH = (wei) =>{
                return drizzle.web3.utils.fromWei(wei, 'ether')
        }

        return (
        <>
        {
        props.purchased.map((flt, index) => {
        return <ListGroup.Item key={index}>
                <Row>
                <Col>
                <h5><Badge variant="info">{flt.flight}</Badge> - {StatusCodes[flt.state]}</h5>
                </Col>
                </Row>
                <Row>
                <Col>
                <Badge variant="success">{ETH(flt.amount) + ' ETH'}</Badge> In <Badge variant="primary">{ETH(flt.payout) + ' ETH'}</Badge> Out
                </Col>
                        {ClaimCodes.includes(flt.state) ? (
                <Col>
                                <Claim index={flt.index} />
                </Col>
                        ):(
                <Col>
                                <StatusUpdate index={flt.index} />
                </Col>
                        )
                                
                        }
                </Row>
                </ListGroup.Item>
        })
        }
        </>
        )
}

const Insured = (props) => {
        const { drizzle, useCacheCall, useCacheEvents, useCacheSend } = drizzleReactHooks.useDrizzle();

        const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
                account: drizzleState.accounts[0],
                state: drizzleState
        }))
        const toBN = drizzle.web3.utils.toBN

        const Purchased = []

        useCacheCall(['FlightSuretyApp'], call => {
                props.flights.map((flt, ind) => {
                        let getInsurance = call('FlightSuretyApp', 'getInsurance', flt.flight, {from: drizzleState.account})
                        if(getInsurance != null && getInsurance.amount != "undefinde" && getInsurance.amount != "0"){
                                let data = {
                                        'index': ind,
                                        'flight': flt.flight,
                                        'amount': getInsurance.amount,
                                        'payout': getInsurance.payoutAmount,
                                        'state': flt.statusCode
                                }
                                Purchased.push(data)
                        }

                })
        })

        return (
                <>
                <Card>
                <Card.Img variant="top" src="https://bit.ly/33Dj5P7" />
                <Card.Body>

                <Card.Title>Insured Flights</Card.Title>
                <Card.Subtitle> Purchased Insurance</Card.Subtitle>
                </Card.Body>

                <ListGroup variant="flush">

                {Purchased ? (
                        <InsuredFlights flights={props.flights} purchased={Purchased}></InsuredFlights>
                ):(
                        <ListGroup.Item> heath </ListGroup.Item>
                )}

                </ListGroup>
                        
                <Card.Footer>
                Address: <Badge variant="primary">...{drizzleState.account.slice(-10)}</Badge>
                </Card.Footer>

                </Card>
                </>
        )
}

export default Insured;
