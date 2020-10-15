import React from 'react'
import { drizzleReactHooks } from 'drizzle-react'
import { Card, Badge, ListGroup, ListGroupItem } from 'react-bootstrap'

import Dashboard from './Dashboard.js'
import Oracles from './Oracles.js'

const Account = () => {
        const { drizzle, useCacheCall, useCacheEvents } = drizzleReactHooks.useDrizzle();
        const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
                account: drizzleState.accounts[0],
                balance: drizzleState.accountBalances[drizzleState.accounts[0]],
        }))
        
        const isOwner = useCacheCall('FlightSuretyApp', 'isContractOwner')
        const isOperational = useCacheCall('FlightSuretyApp', 'isOperational')

        //const balance = drizzle.web3.utils.fromWei(toString(drizzleState.balance));
        const balance = drizzleState.balance;

        return (
                <>
                <Card bg="primary" text="white">
                <Card.Img variant="top" src="http://bit.ly/37uRKir" />

                <Card.Body>
                {isOwner ? (
                        <>
                        <Dashboard></Dashboard>
                        <Oracles></Oracles>
                        </>
                ) : (
                        <>
                        <Card.Title>Welcome</Card.Title>
                        </>
                )}
                </Card.Body>

                <ListGroup variant="flush"> 
                <ListGroupItem variant="primary">
                        <span><b>Address:</b> {drizzleState.account}</span>
                </ListGroupItem>
                <ListGroupItem variant="primary">
                        <span><b>Balance:</b> { balance } ETH</span>
                </ListGroupItem>
                </ListGroup>

                <Card.Footer>
                        {isOperational ? (
                                <Badge variant="success">Contract Is Active</Badge>
                        ):(
                                <Badge variant="warning">Contract Is Inactive</Badge>
                        )}
                </Card.Footer>

                </Card>
                </>
        );
}

export default Account;
