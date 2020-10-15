import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { drizzleReactHooks } from 'drizzle-react'

import Account from './accounts/Account.js'
import Purchase from './insurance/Purchase.js'
import Insured from './insurance/Insured.js'
import Claim from './insurance/Claim.js'

import {useGetFlightsData} from './Flights.js'

const Controller = () => {
        const { useCacheCall } = drizzleReactHooks.useDrizzle()
        const isOperational = useCacheCall('FlightSuretyApp', 'isOperational')
        const flights = useGetFlightsData()

        return (
                <>
                <Account></Account>
                {isOperational ? (
                                <>
                                <Purchase flights={flights}></Purchase>
                                <Insured flights={flights}></Insured>
                                <Claim flights={flights}></Claim>
                                </>
                                        ):(
                        <></>
                )}
                </>
        )
}
export default Controller;
