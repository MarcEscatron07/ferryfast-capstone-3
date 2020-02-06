import React from 'react';

import PageUnavailable from './misc/PageUnavailable';

import Container from '@material-ui/core/Container';

function ConfirmBookingPage() {
    return (
        <div style={{height: "100vh"}}>        
            <Container maxWidth="sm">
                <div className="container content-container rounded shadow p-3">
                    <div className="row">
                        <div className="col text-center">
                            <PageUnavailable/>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ConfirmBookingPage;
