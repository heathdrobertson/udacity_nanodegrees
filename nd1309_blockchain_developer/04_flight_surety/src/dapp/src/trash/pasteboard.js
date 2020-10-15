
for (let i = 0; i < flightsCount; i++) {
        useCallback(() => {
                let flt = useCacheCall(['FlightSuretyApp'], call => call('FlightSuretyApp', 'getFlight', i))
                if (flt != null) {
                        let obj = {
                                airline: flt[0],
                                flight: flt[1],
                                timestamp: flt[2],
                                statusCode: flt[3]
                        }
                        flights.push(obj)
                }
        },[i])
}
