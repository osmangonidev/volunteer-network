import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Events.css'
const Events = () => {
    const [user]=useContext(UserContext)
    const [events, setEvents]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:5000/my-events?email=${user.email}`,{
            method:'GET', 
            headers:{
                'Content-Type':'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setEvents(result)
        })
    })

    const calcelEventHandler=(id)=>{
        fetch('http://localhost:5000/cancel-event',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        .then(res=>res.json())
        .then(result=>{
            if(result){
                const existingEvents=events.filter(data=>data._id !== id)
                setEvents(existingEvents)
            }
        })
    }

    return (
        <div>
            <Grid container item xs={11} justify='center'  spacing='5' className='mx-auto'>
                {
                    events.map(event=>{
                       return(
                            <Grid key={event._id} container item xs={10} sm={5} justify='space-around' 
                            className="shadow p-3 m-5 bg-white rounded">
                                <Grid item xs={10} md={5} className='w-50'>
                                    <img className='w-100 h-75' src={event.img} alt=""/>
                                </Grid>
                                <Grid item xs={10} md={5} >
                                    <h3>{event.eventName}</h3>
                                    <h4>{event.date}</h4>
                                    <div >
                                    <button onClick={()=>calcelEventHandler(event._id)}  className='event-cancel'>cancel</button>
                                    </div>
                                </Grid>
                            </Grid>
                       )
                    })
                }
            </Grid>
            
       
        </div>
    );
};

export default Events;