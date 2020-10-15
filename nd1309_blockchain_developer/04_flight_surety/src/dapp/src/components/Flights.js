import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { drizzleReactHooks } from 'drizzle-react'


const useGetFlightsData = () => {
        const { useCacheCall, useCacheEvents } = drizzleReactHooks.useDrizzle()
        const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
                account: drizzleState.accounts[0],
                state: drizzleState
        }))

        const flightsCount = useCacheCall('FlightSuretyApp', 'getFlightsCount')
        const flights = []

        useCacheCall(['FlightSuretyApp'], call => {
                if(flightsCount){
                        for (let i = 0; i < flightsCount; i++) {
                                let flt = call('FlightSuretyApp', 'getFlight', i)
                                if (flt) {
                                        flights.push(flt)
                                }
                        }
                }
        })
        return flights
}

export {useGetFlightsData}
