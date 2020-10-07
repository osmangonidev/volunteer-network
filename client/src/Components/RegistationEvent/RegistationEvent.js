import React from 'react';
import { FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const RegistationEvent = () => {
    const history=useHistory()
    const [user]=useContext(UserContext)
    const [taskInfo, setTaskInfo]=useState({eventName:user.event?.name, name:user.name, email:user.email, img:user.event?.img})
    const submitFormHandler=(event)=>{
        event.preventDefault()
        fetch('http://localhost:5000/taskRegister',{
            method:'POST', 
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(taskInfo)
        })
        .then(res=>res.text())
        .then(result=>{
            if(result=='true'){
                history.push('/events')
            }
        })
        
    }
   
    return (
        <div >
            <form onSubmit={submitFormHandler} >
            <FormGroup className='w-25 mx-auto border border-secondary p-4'>
                <h3>Register as a Volunteer</h3>
                    <FormControl className='mt-3'>
                        <InputLabel htmlFor="name">Full Name</InputLabel>
                        <Input onBlur={(event)=>setTaskInfo({...taskInfo,name:event.target.value})}
                         name='name' id="name" aria-describedby="my-helper-text" value={user.name } required/>
                    </FormControl>
                    <FormControl className='mt-3'>
                        <InputLabel htmlFor="email">Email address</InputLabel>
                        <Input onBlur={(event)=>setTaskInfo({...taskInfo,email:event.target.value})} 
                        name='email' id="email" aria-describedby="my-helper-text" value={user?.email}/>
                    </FormControl>
                    <FormControl className='mt-3'>
                        <Input onBlur={(event)=>setTaskInfo({...taskInfo,date:new Date(event.target.value).toDateString()})} type='date'
                         name='date' id="date" aria-describedby="my-helper-text" required/>
                    </FormControl>
                    <FormControl className='mt-3'>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input onBlur={(event)=>setTaskInfo({...taskInfo,description:event.target.value})}id="description" aria-describedby="my-helper-text" />
                    </FormControl>
                    <FormControl className='mt-3'>
                    <InputLabel htmlFor="description">Organization Name</InputLabel>
                        <Input onBlur={(event)=>setTaskInfo({...taskInfo,eventName:event.target.value})}name='organizationName' id="organizationName"
                         aria-describedby="my-helper-text" value={user.event?.name} required />
                    </FormControl>
                     <button type='submit' className="blue-button mt-3 rounded">Registation</button>
            </FormGroup>
            </form>
        </div>
    );
};

export default RegistationEvent;