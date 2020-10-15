import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { Card, Badge, Button, ListGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Claim = (props) => {

        const { drizzle, useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
        const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
                account: drizzleState.accounts[0]
        }))

        const { send, TXObjects } = useCacheSend( 'FlightSuretyApp', 'withdrawBalance')
        const Balance = useCacheCall('FlightSuretyApp', 'getBalance')

        const ETH = (wei) =>{
                return drizzle.web3.utils.fromWei(wei, 'ether')
        }
       
        const handleWithdrawBalance = () => {
                toast.success("Withdrawing balance... " + ETH(Balance) + " ETH")
                console.log(drizzleState.account)
                send({from: drizzleState.account})
                console.log()
        }
        return (
        <Card>
        <Card.Img variant="top" src="https://bit.ly/2J7HsuT" />
        <Card.Body>

        <Card.Title>Claim</Card.Title>
        <Card.Subtitle className="mb-2">{props.selectedFlight}</Card.Subtitle>
        </Card.Body>
                
        <ListGroup variant="flush">
        <ListGroup.Item>
                {Balance && ETH(Balance)} ETH 
        </ListGroup.Item>
        <ListGroup.Item>
                <Button variant="primary" onClick={handleWithdrawBalance}>Receive Payout</Button>
        </ListGroup.Item>
        </ListGroup> 

        <Card.Footer>
        Address: <Badge variant="primary">...{drizzleState.account.slice(-10)}</Badge>
        </Card.Footer>

        </Card>

        )
}
export default Claim 
