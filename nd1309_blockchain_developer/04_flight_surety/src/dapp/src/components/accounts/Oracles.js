import React, { useCallback, useState, useEffect } from 'react';
import { LockFill, UnlockFill } from 'react-bootstrap-icons'
import { drizzleReactHooks } from 'drizzle-react'
import { Card, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';


const RegisterOracles = (props) => {
        const { drizzle, useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
        const {send, TXObjects} = useCacheSend('FlightSuretyApp', 'registerOracle');

        const fee = useCacheCall('FlightSuretyApp', 'REGISTRATION_FEE');
        const STATUS_CODES = [0, 10, 20, 30, 40, 50];

        const handleRegisterOracles = (e) => {

                oracleAddresses.forEach(addr => {
                        const statusCode = STATUS_CODES[Math.floor(Math.random() * STATUS_CODES.length)];
                        useCallback((addr) => {
                                send({from: addr, value: fee})
                        }, [addr]);
                        console.log(addr);
                        const indexes = Indexes(addr);
                        oracles.push({ addr, indexes, statusCode });
                        console.log({ addr, indexes, statusCode });
                });

                console.log(`${oracles.length} Oracles Registered`);
        }


        useEffect(() => {

        }, [])

        return (
                <>
                <ListGroup.Item  variant="primary">
                Oracles Registered: 40
                </ListGroup.Item>
                <ListGroup.Item  variant="success">
                <Button onClick={handleRegisterOracles}>Register</Button> Oracles
                </ListGroup.Item>
                </>
        )
}

const Oracles = () => {
        const { drizzle, useCacheCall } = drizzleReactHooks.useDrizzle();
        const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
                account: drizzleState.accounts[0],
                state: drizzleState
        }))

        const dataContract = drizzle.contracts.FlightSuretyData.address
        const [contractBalance, setContractBalance] = useState(0)

        const ETH = (wei) =>{
                return drizzle.web3.utils.fromWei(wei, 'ether')
        }

        const WEI = (eth) =>{
                return drizzle.web3.utils.toWei(eth)
        }

        useEffect(() => {
        }, [])

        return (
                <>
                <Card.Subtitle>Oracle Staus</Card.Subtitle>
                <ListGroup className="mt-1 mb-3">
                </ListGroup>
                </>
        )
}

export default Oracles;

