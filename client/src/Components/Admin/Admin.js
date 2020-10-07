import React, { useContext, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AddIcon from '@material-ui/icons/Add';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import AddEvent from './AddEvent';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#F5F6FA",
      color: 'grey',
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'white',
      },
    },
  }))(TableRow);
  
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });


const Admin = () => {
    const [allEvents, setAllEvents] = useState([])
    const [user,setUser]=useContext(UserContext)
    const classes=useStyles();

    useEffect(()=>{ 
        fetch(`http://localhost:5000/all-registered-events?email=${user.email}`,{
            method:'GET', 
            headers:{
                'Content-Type':'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(result=>setAllEvents(result))
    },[])

    useEffect(()=>{
        setUser({...user, clicked:'volunteerList'})
    },[])
    

    const eventDeleteHandler=(id)=>{
        fetch('http://localhost:5000/cancel-event',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        .then(res=>res.json())
        .then(result=>{
            const existingEvents = allEvents.filter(data=>data._id !== id)
            if(result){
                setAllEvents(existingEvents)
            }
        })

    }
    return (
        <Grid container item xs={12}>
            <Grid item md={2} xs={12}>
                <Grid container item xs={12}  style={{padding:'10px',  paddingTop:'20px'}}>
                <Grid container item xs={12} alignItems='center'>
                <Grid item >
                <div onClick={()=>setUser({...user,clicked:'volunteerList'})} className='d-flex my-15 text-center rounded shadow py-3 mb-3 px-2'>
                    <div>
                        <PeopleOutlineIcon></PeopleOutlineIcon>
                    </div>
                    <div classNamme='ml-1 '>
                        <b>Volunteer register list</b>
                    </div>
                </div>
                </Grid>

                <Grid item >
                <div onClick={()=>setUser({...user,clicked:'addEvent'})} className='d-flex my-15 text-center  rounded shadow p-3 mb-5 bg-white'>
                    <div><AddIcon></AddIcon></div>
                    <div classNamme='ml-1'><b>Add Event</b></div>
                </div>
                </Grid>
                </Grid>

                </Grid>
            </Grid>

            {
                user.clicked == 'volunteerList' &&
                <Grid item md={9} xs={12} style={{marginLeft:'20px', marginTop:'10px'}}>
                <h3 style={{textAlign:'left', marginLeft:'10px', color:'#0C0C0C'}}>Volunteer register list</h3>
                <TableContainer component={Paper} className=' mt-5 p-5 rounded shadow text-center'>
                <Table className={classes.table} aria-label="customized table" >
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Name</StyledTableCell>
                        <StyledTableCell align="left">Email Id</StyledTableCell>
                        <StyledTableCell align="left">Registation Date</StyledTableCell>
                        <StyledTableCell align="left">Volunteer list</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {allEvents.map((event)=>{
                        return(
                            <StyledTableRow key={event._id}>
                        <StyledTableCell component="th" scope="row">
                            {event.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">{event.email}</StyledTableCell>
                        <StyledTableCell align="left">{event.date}</StyledTableCell>
                        <StyledTableCell align="left">{event.eventName}</StyledTableCell>
                        <StyledTableCell align="left">
                            <DeleteForeverIcon onClick={()=>eventDeleteHandler(event._id)} 
                            justify='center' className="text-danger">
                            </DeleteForeverIcon>
                        </StyledTableCell>
                        </StyledTableRow>
                        )
                        })
                    }
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
            }
            {
                user.clicked == 'addEvent' &&
                <AddEvent></AddEvent>
            }
        </Grid>
    );
};

export default Admin;