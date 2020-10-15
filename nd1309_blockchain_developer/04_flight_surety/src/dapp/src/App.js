import React from 'react';
import { Drizzle } from 'drizzle';
import { drizzleReactHooks } from 'drizzle-react';
import 'react-toastify/dist/ReactToastify.css';

import Oracles from './OracleSetup.js';
import { CardColumns, Button, Row, Col, Badge } from 'react-bootstrap';
import './assets/styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import drizzleOptions from './drizzleOptions'

import LoadingComponent from './components/LoadingComponent';
import Controller from './components/Controller.js'

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;
//https://github.com/fkhadra/react-toastify#configure-the-toastcontainer-when-it-is-mounted-on-demand

const App = () => {
        const notify = () => toast("WOW so easy dude!");
        Oracles();
        return (
                //https://reactjs.org/docs/fragments.html
                <React.Fragment>

                <section className="jumbotron">

                <div className="container">
                <Row>
                <Col md="auto">
                <img src="logo.png" className="logo img-fluid" alt="Logo"/>
                </Col>
                <Col>
                <h1>FlightSurety</h1>
                <p className="lead">Collective Flight Insurance</p>
                <p><Badge variant="danger">NOT ALL FUNCTIONALITY HAS BEEN FULLY IMPLEMENTED</Badge></p>
                <p>
                FlightSurety is a sample Dapp running on the Ethereum Rinkeby Testnet. Make sure your Metamask network is set to 'Rinkeby'.  Click <a href="https://faucet.rinkeby.io/" target="_blank">here</a> to acquire Ether from the Rinkeby faucet.
                </p>
                </Col>
                </Row>
                </div>

                </section>

                <section className="container">

                <DrizzleProvider drizzle={drizzle} >
                <LoadingComponent>

                <CardColumns>
                        <Controller></Controller>
                </CardColumns>

                </LoadingComponent>
                </DrizzleProvider>

                </section>

                </React.Fragment>
        );
}

export default App;
