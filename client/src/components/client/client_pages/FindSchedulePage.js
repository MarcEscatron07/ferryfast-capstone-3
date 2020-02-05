import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function FindSchedulePage() {
    const classes = useStyles();

    return (
        <Container maxWidth="sm">
            <div className="container main-container rounded">
                <div className="row">
                    <div className="col-6">
                        <form>                        
                            <FormControl className={classes.formControl}>
                                <Select native>
                                    <option value="" style={{color: "gray"}}>Select origin..</option>                       
                                </Select>
                                <Select native>
                                    <option value="" style={{color: "gray"}}>Select destination..</option>                       
                                </Select>
                                <Select native>
                                    <option value="" style={{color: "gray"}}>Select date..</option>                       
                                </Select>
                                <Select native>
                                    <option value="" style={{color: "gray"}}>Select accommodation..</option>                       
                                </Select>
                            </FormControl>
                            <Button color="primary">Proceed</Button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default FindSchedulePage
