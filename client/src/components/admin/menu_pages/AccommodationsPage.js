import React, { forwardRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import Swal from 'sweetalert2';
import { Toast } from './ToastAuth';

import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { getAccommodationsQuery } from '../../../client-queries/queries';
import { 
    createAccommodationMutation, 
    updateAccommodationMutation, 
    deleteAccommodationMutation
} from '../../../client-queries/mutations';

import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import HomeIcon from '@material-ui/icons/Home';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 22,
    },
}));

const ToastComponent = (iconProp, titleProp) => {
    Toast.fire({
        icon: iconProp,
        title: titleProp,
        showClass: {
            popup: 'animated fadeInRight faster'
        },
        hideClass: {
            popup: 'animated fadeOutRight faster'
        }
    });
}

function AccommodationsPage(props) {
    const [accommodations, setAccommodations] = useState({        
        data: []
    });

    let history = useHistory();
    const classes = useStyles();
    let dataObject = props.data;

    useEffect(() => {        
        if(dataObject.loading === false && dataObject.error === undefined) {   
            let accommodationsArray = dataObject.getAccommodations;
            
            setAccommodations({...accommodations, data: []})
            accommodationsArray.forEach(acArr => {
                setAccommodations(prevState => {
                    const data = [...prevState.data];
                    data.push({
                        id: acArr.id,
                        name: acArr.name,
                        price: acArr.price.toFixed(2)
                    });
                    return { ...prevState, data };
                });
            });            
        }

        if(dataObject.error !== undefined){                   
            Swal.fire({
                icon: "error",
                timer: 2200,
                title: "Failed to load data!"
            })
        }
    },[dataObject])

    const handleBreadCrumbClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'home'){
            history.push('/admin/home');
        }
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className="mb-3">
                <Link id="home" color="inherit" href="/" onClick={handleBreadCrumbClick} className={classes.link}>
                    <HomeIcon className={classes.icon} />
                    Home
                </Link>   
                <Typography color="textPrimary" className={classes.link}>            
                    Accommodations
                </Typography>
            </Breadcrumbs>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col">
                        <Typography className="mb-2" variant="h6" component="h1">
                            Accommodations
                        </Typography>
                        <MaterialTable
                            icons={tableIcons}
                            title=""
                            columns={[
                                { title: 'ID', field: 'id', hidden: true },
                                { title: 'Name', field: 'name' },
                                { title: 'Price', field: 'price' },
                            ]}
                            data={accommodations.data}
                            editable={{
                                onRowAdd: newData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();                                        
                                        if(!isNaN(newData.price)){
                                            let newAccommodationData = {
                                                name: newData.name,
                                                price: parseFloat(newData.price)
                                            }                                     
                                            props.createAccommodation({
                                                variables: newAccommodationData,
                                                refetchQueries: [{query: getAccommodationsQuery}]
                                            })
                                            .then((res) => {
                                                Swal.fire({
                                                    icon: "success",
                                                    timer: 2200,
                                                    title: "Successfully added an accommodation!"
                                                })

                                                setAccommodations(prevState => {
                                                    const data = [...prevState.data];
                                                    data.push(newData);
                                                    return { ...prevState, data };
                                                });
                                            })
                                            .catch((err) => {
                                                Swal.fire({
                                                    icon: "error",
                                                    timer: 2200,
                                                    title: "Unable to add accommodation!"
                                                })
                                            })     
                                        } else {
                                            ToastComponent('error', 'Entered price is invalid!');
                                        }                                                 
                                    }, 600);
                                }),
                                onRowUpdate: (newData, oldData) =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        if (oldData) {
                                            if(!isNaN(newData.price)){
                                                let updateAccommodationData = {
                                                    id: newData.id,
                                                    name: newData.name,
                                                    price: parseFloat(newData.price)
                                                }
                                                props.updateAccommodation({
                                                    variables: updateAccommodationData,
                                                    refetchQueries: [{query: getAccommodationsQuery}]
                                                })
                                                .then((res) => {
                                                    Swal.fire({
                                                        icon: "success",
                                                        timer: 2200,
                                                        title: "Successfully updated accomodation!"
                                                    })

                                                    setAccommodations(prevState => {
                                                        const data = [...prevState.data];
                                                        data[data.indexOf(oldData)] = newData;
                                                        return { ...prevState, data };
                                                    });                                            
                                                })
                                                .catch((err) => {
                                                    Swal.fire({
                                                        icon: "error",
                                                        timer: 2200,
                                                        title: "Unable to update accomodation!"
                                                    })
                                                })
                                            } else {
                                                ToastComponent('error', 'Entered price is invalid!');
                                            }
                                        }
                                    }, 600);
                                }),
                                onRowDelete: oldData =>
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve();
                                        let deleteAccommodationData = {
                                            id: oldData.id
                                        }
                                        props.deleteAccommodation({
                                            variables: deleteAccommodationData,
                                            refetchQueries: [{query: getAccommodationsQuery}]
                                        })
                                        .then((res) => {
                                            Swal.fire({
                                                icon: "info",
                                                timer: 2200,
                                                title: "Accommodation deleted!"
                                            })

                                            setAccommodations(prevState => {
                                                const data = [...prevState.data];
                                                data.splice(data.indexOf(oldData), 1);
                                                return { ...prevState, data };
                                            });                                     
                                        })
                                        .catch((err) => {
                                            Swal.fire({
                                                icon: "error",
                                                timer: 2200,
                                                title: "Unable to delete accommodation!"
                                            })
                                        })
                                    }, 600);
                                }),
                            }}
                        />
                    </div>                    
                </div>                
            </div>            
        </>
    )
}

export default compose(
    graphql(getAccommodationsQuery),
    graphql(createAccommodationMutation, {name: 'createAccommodation'}),     
    graphql(updateAccommodationMutation, {name: 'updateAccommodation'}),
    graphql(deleteAccommodationMutation, {name: 'deleteAccommodation'}),
)(AccommodationsPage);
