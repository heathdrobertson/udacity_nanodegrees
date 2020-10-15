        for (let i = 0; i < flightsCount; i++) {
                let flt = useCallback((i) => {useCacheCall(
                                ['FlightSuretyApp'],
                                call => call('FlightSuretyApp', 'getFlight', i)
                        )
                }, [i])
                if (flt) { flights.push(flt) }
        }

        let flightsList = [] 

        if (flightsCount) {
                for (let i = 0; i < flightsCount; i++) {
                        flightsList.push(i)
                }
        }

        /*
        */
        let flights = []
        flightsList.map((i) => {
                let obj = {
                        airline: flt[0],
                        flight: flt[1],
                        timestamp: flt[2],
                        statusCode: flt[3]
                }
                flights.push(obj)
        })

                gh.map((k, v) => {
                        console.log('Key: ' + k + ' Value: ' + v)
                        let flt = useCacheCall(
                                ['FlightSuretyApp'], 
                                call => call('FlightSuretyApp', 'getFlight', k)
                        )
                        if(flt) {
                                flights.push(flt)
                }})
