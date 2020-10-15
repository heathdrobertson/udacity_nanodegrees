import React from 'react';
import { drizzleReactHooks } from 'drizzle-react';
import { Spinner } from 'react-bootstrap'

const { useDrizzleState } = drizzleReactHooks;

function LoadingComponent({children}) {
        const drizzleState = useDrizzleState(drizzleState => ({
                drizzleStatus: drizzleState.drizzleStatus
        }))
        if(drizzleState.drizzleStatus.initialized === false) {
                return (
                        <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                );
        }

        return (
                <>
                {children}
                </>
        )
}

export default LoadingComponent;
