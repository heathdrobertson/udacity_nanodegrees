import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { toast } from 'react-toastify';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

import FlightInsurance from './purchase/FlightInsurance';

const Flights = () => {
    const { drizzle } = useDrizzle();
    const state = useDrizzleState(state => state); 
    const { FlightSuretyApp, FlightSuretyData } = drizzle.contracts;
    const { getFlightsCount, getFlight } = state.contracts.FlightSuretyApp;

    const [flightsCountKey, setFlightsCountKey] = useState();
    const [flightsCount, setFlightsCount] = useState();
    const [flightsDataKeys, setFlightsDataKeys] = useState();
    const [flightsData, setFlightsData] = useState();
    
    useEffect(() => {
        const fltCountKey = FlightSuretyApp.methods['getFlightsCount'].cacheCall();
        setFlightsCountKey(fltCountKey);
        
        if(flightsCountKey) {
            const FlightCountResult = getFlightsCount[flightsCountKey];
            const flights = (FlightCountResult && FlightCountResult.value);
            setFlightsCount(flights);
        }

        if(flightsCount) {
            const flightsKeyList = [];

            for (let i = 0; i < flightsCount; i++) {
                flightsKeyList.push(
                    FlightSuretyApp.methods['getFlight'].cacheCall(i)
                );
            } 
            setFlightsDataKeys(flightsKeyList);
        }

        if(flightsDataKeys) {
            const flightsData = flightsDataKeys.map((key) => {
                const Result = getFlight[key];
                return {
                    airline: (Result && Result.value[0]),
                    flight: (Result && Result.value[1]),
                    timestamp: (Result && Result.value[2]),
                    statusCode: (Result && Result.value[3])
                };
            });
            setFlightsData(flightsData);
        }
    }, [ 
        flightsCountKey,
        flightsCount,
        getFlightsCount, 
        getFlight ]);
    return (
        <>
        { flightsData ? <FlightInsurance flights={flightsData} /> : 0 }
        </>
    );
}

export default Flights;
