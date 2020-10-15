import React, { useCallback, useEffect } from 'react';
import { drizzleReactHooks } from 'drizzle-react'
import { Card, Badge, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const Activation = (props) => {
        // setOperatingStatus (bool mode)
        const { useCacheSend } = drizzleReactHooks.useDrizzle();
        const { send, TXObjects } = useCacheSend( 'FlightSuretyApp', 'setOperatingStatus')
        return (
                <>
                {props.data.isOperational ?  (
                <ListGroupItem action onClick={
                        useCallback(() => send(
                        false,
                        {from: props.data.account}
                        ), [])
                } variant="warning">
                Deactivate Contracts
                </ListGroupItem>
                ):(
                <ListGroupItem action onClick={
                        useCallback(() => send(
                        true,
                        {from: props.data.account}
                        ), [])
                } variant="success">
                Activate Contracts 
                </ListGroupItem>
                )}
                </>
        )
}

const Authorization = (props) => {
        const { useCacheSend } = drizzleReactHooks.useDrizzle();
        const { send, TXObjects } = useCacheSend( 'FlightSuretyData', 'setCallerAuthorizationStatus')

        return (
                <>
                {props.data.appContractIsAuthorized ?  (
                <ListGroupItem  variant="success" action onClick={
                        useCallback(() => send(
                                props.data.contract,
                                false,
                                {from: props.data.address}
                        ), [])
                }>
                App Is Authorized 
                </ListGroupItem>
                ):(
                <ListGroupItem variant="warning" action onClick={
                        useCallback(() => send(
                                props.data.contract,
                                true,
                                {from: props.data.address}
                        ), [])
                }>
                Authorize App
                </ListGroupItem>
                )}
                </>
        )
}

const Dashboard = (props) => {
        const { drizzle, useCacheCall, useCacheEvents } = drizzleReactHooks.useDrizzle();
        const appContractIsAuthorized = useCacheCall( 'FlightSuretyData', 'getCallerAuthorizationStatus', props.data.contract)
        
        if(appContractIsAuthorized){
                props.data.appContractIsAuthorized = appContractIsAuthorized
        }

        return (
                <>
                <Card.Title>Dashboard</Card.Title>
                <ListGroup> 
                <Activation data={props.data}></Activation>
                <Authorization data={props.data} contract={props.data.contract}></Authorization>
                </ListGroup>
                </>
        );
}

export default Dashboard;

