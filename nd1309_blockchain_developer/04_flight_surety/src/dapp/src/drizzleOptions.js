import FlightSuretyApp from './contracts/FlightSuretyApp.json'
import FlightSuretyData from './contracts/FlightSuretyData.json'

const options = {
    web3: {
        block: false,
        fallback: {
            type: 'ws',
            url: 'ws://0.0.0.0:8545'
        }
    },
    contracts: [FlightSuretyApp, FlightSuretyData],
    events: {
        FlightSuretyApp: [
            'AirlineApplied',
            'AirlineRegistered',
            'AirlinePaid',
            'FlightStatusProcessed',
            'PassengerInsuranceBought',
            'FlightStatusInfo',
            'OracleReport',
            'OracleRequest',
            'OracleIsRegistered',
            'ContractOperatingStatus'
        ]
    },
    polls: {
        accounts: 15000
    }
}

export default options
