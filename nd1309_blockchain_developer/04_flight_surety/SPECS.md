# Flight Surety
__Ethereum Dapp for Passenger Flight Delay Insurance__

## Udacity - Blockchain Developer Nanodegree - Project 04

* Flight delay insurance for passengers.
* Managed as collaboration between multiple airlines.
* Passengers can purchase insurance prior to flight.
* If flight is delayed due to airline fault (LATE AIRLINE), passengers are paid 1.5X the amount they paid for the insurance.

___

**Project Specifications**
+ [1 Separation of Concerns, Operational Control and “Fail Fast”](#1-separation-of-concerns-operational-control-and-fail-fast)
+ [2 Airlines](#2-airlines)
+ [3 Passengers](#3-passengers)
+ [4 Oracles (Server App)](#4-oracles-server-app)

___


## 1 Separation of Concerns, Operational Control and “Fail Fast”
- [x] Smart Contract Seperation
    - Smart Contract code is separated into multiple contracts:
        1. FlightSuretyData.sol for data persistence
        2. FlightSuretyApp.sol for app logic and oracles code
- [x] Dapp Created and Used for Contract Calls
    - A Dapp client has been created and is used for triggering contract calls. 
    - Client can be launched with “npm run dapp” and is available at [http://localhost:8000][2]
- [x] Specific contract calls:
     1. Passenger can purchase insurance for flight
     2. Trigger contract to request flight status update
- [x] Oracle Server Application
    - A server app has been created for simulating oracle behavior. Server can be launched with “npm run server”
- [x] Operational status control is implemented in contracts
    - Students has implemented operational status control.
- [x] Fail Fast Contract
    - Contract functions “fail fast” by having a majority of “require()” calls at the beginning of function body

[Top](#flight-surety)

## 2 Airlines
- [x] Airline Contract Initialization
    - First airline is registered when contract is deployed.
- [x] Multiparty Consensus
    - Only existing airline may register a new airline until there are at least four airlines registered
- [x] Demonstrated either with Truffle test or by making call from client Dapp
    - Multiparty Consensus
- [x] Registration of fifth and subsequent airlines requires multi-party consensus of 50% of registered airlines
    - Demonstrated either with Truffle test or by making call from client Dapp
- [x] Airline Ante
    - Airline can be registered, but does not participate in contract until it submits funding of 10 ether
    - Demonstrated either with Truffle test or by making call from client Dapp

[Top](#flight-surety)

## 3 Passengers
- [x] Passenger Airline Choice
    - Passengers can choose from a fixed list of flight numbers and departure that are defined in the Dapp client
- [x] Passenger Payment
    - Passengers may pay up to 1 ether for purchasing flight insurance.
- [x] Passenger Repayment
    - If flight is delayed due to airline fault, passenger receives credit of 1.5X the amount they paid
- [x] Passenger Withdraw
    - Passenger can withdraw any funds owed to them as a result of receiving credit for insurance payout
- [x] Insurance Payouts
    - Insurance payouts are not sent directly to passenger’s wallet

[Top](#flight-surety)

## 4 Oracles (Server App)
- [x] Functioning Oracle
    - Oracle functionality is implemented in the server app.
- [x] Oracle Initialization
    - Upon startup, 20+ oracles are registered and their assigned indexes are persisted in memory
- [x] Oracle Updates
    - Update flight status requests from client Dapp result in OracleRequest event emitted by Smart Contract that is captured by server (displays on console and handled in code)
- [x] Oracle Functionality
    - Server will loop through all registered oracles, identify those oracles for which the OracleRequest event applies, and respond by calling into FlightSuretyApp contract with random status code of Unknown (0), On Time (10) or Late Airline (20), Late Weather (30), Late Technical (40), or Late Other (50)


[Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

[1]: https://udacity.com
[2]: http://localhost:8000

