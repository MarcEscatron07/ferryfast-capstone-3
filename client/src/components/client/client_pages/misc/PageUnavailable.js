import React from 'react';

import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';

function PageUnavailable() {
    return (
        <div>
            <WarningIcon fontSize="large"/>
            <Typography  variant="h5" component="h1">
                This page is currently unavailable.
            </Typography>
        </div>
    )
}

export default PageUnavailable;
