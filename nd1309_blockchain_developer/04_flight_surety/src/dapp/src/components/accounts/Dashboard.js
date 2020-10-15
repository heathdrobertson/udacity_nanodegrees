import React, { useCallback, useState, useEffect } from 'react';
import { LockFill, UnlockFill } from 'react-bootstrap-icons'
import { drizzleReactHooks } from 'drizzle-react'
import { Card, Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';

const Activation = (props) => {
        const { useCacheSend, useCacheCall } = drizzleReactHooks.useDrizzle();
        const isOperational = useCacheCall('FlightSuretyApp', 'isOperational')
        const { send, TXObjects } = useCacheSend( 'FlightSuretyApp', 'setOperatingStatus')

        return (
                <>
                {isOperational ?  (
                        <ListGroup.Item variant="success"> 
                        <Button onClick={
                                useCallback(() => send(
                                        false,
                                        {from: props.account}
                                ), [])
                        }>Lock</Button> Contract is: <UnlockFill></UnlockFill> 
                        </ListGroup.Item>
                ):(
                        <ListGroup.Item  variant="warning">
                        <Button onClick={
                                useCallback(() => send(
                                        true,
                                        {from: props.account}
                                ), [])
                        }>Unlock</Button> Contract is: <LockFill></LockFill>
                        </ListGroup.Item>
                )}
                </>
        )
}

const Authorization = (props) => {
        const { drizzle, useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
        const contract = drizzle.contracts.FlightSuretyApp.address
        const appContractIsAuthorized = useCacheCall(
                'FlightSuretyData',
                'getCallerAuthorizationStatus',
                contract)
        const { send, TXObjects } = useCacheSend('FlightSuretyData', 'setCallerAuthorizationStatus')

        useEffect(() => {
                if (appContractIsAuthorized === 'undefined') {
                        console.log('useEffect')
                } else if (appContractIsAuthorized === false) {
                        send(contract, true, {from: props.account})
                }
        }, [appContractIsAuthorized])

        return (
                <>
                {appContractIsAuthorized ?  (
                        <ListGroupItem  variant="success">
                        App Contract Auth: <UnlockFill></UnlockFill>
                        </ListGroupItem>
                ):(
                        <ListGroupItem variant="warning">
                        App Contract Auth: <LockFill></LockFill>
                        </ListGroupItem>
                )}
                </>
        )
}

const Dashboard = () => {
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

        drizzle.web3.eth.getBalance(dataContract).then((res) => {
                setContractBalance(res)
        })

        useEffect(() => {
                if (contractBalance !== 0 && contractBalance < 2000000000000000000) {
                        console.log("Data Contract Balance Updated")
                        drizzle.web3.eth.sendTransaction({from: drizzleState.account, to: dataContract, value: WEI('2')})
                }
        }, [contractBalance])

        return (
                <>
                <Card.Title>Dashboard</Card.Title>
                <Card.Subtitle>Contract Status</Card.Subtitle>
                <ListGroup className="mt-1 mb-3">
                <Activation  account={drizzleState.account}></Activation>
                <Authorization account={ drizzleState.account }></Authorization>
                <ListGroup.Item variant="success">Contract Balance: {contractBalance && ETH(contractBalance) } ETH</ListGroup.Item>
                </ListGroup>
                </>
        )
}

export default Dashboard;

