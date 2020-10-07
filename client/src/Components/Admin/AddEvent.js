import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import upload from '../../img/upload.png'
const AddEvent = () => {

    const [addEvent, setaddEvent]=useState({date:new Date().toDateString(),img:'https://imgur.com/XDR2o8k.png'})
    const history=useHistory()
    
    const addEventHandler=()=>{
        fetch('http://localhost:5000/add-event',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(addEvent)
        })
        .then(res=>res.json())
        .then(result=>{
            if(result){
                history.push('/')
            }
        })
    }
    return (
        <Grid  item xs={12} md={9} className='mt-3 ml-2 ' >
            <h3 className="border-none ml-5">Add Event</h3>
            <Grid  container item xs={12} className='p-5 mt-5 shadow rounded'>
                <Grid item xs={12} sm={6}>
                    <div>
                        <p className='font-weight-bold mb-0'>Event title</p><br/>
                        <input onBlur={(event)=>setaddEvent({...addEvent,name:event.target.value})} 
                            placeholder='Enter a title' className='event-input ' id='title' type="text"/>
                    </div>
                    <div>
                        <p className='font-weight-bold mb-0 mt-2' >Description</p>
                        <textarea onBlur={(event)=>setaddEvent({...addEvent,description:event.target.value})}
                        className='event-textarea border border-secondary my-3 py-2 px-3 w-75 rounded' placeholder='Enter event description' name="description" id="description" 
                         rows="8"></textarea>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <div>
                        <b>Event date</b><br/>
                        <input type='date' className='event-input border border-secondary my-3 px-3 h-25 rounded' 
                        id='date' onBlur={(event)=>setaddEvent({...addEvent,date:new Date(event.target.value).toDateString()})} />
                    </div>
                    <div>
                        <p className='font-weight-bold mb-0 mt-1' >Add Image</p><br/>
                        <input placeholder='Give a image link' type='text' className='event-input' id='date' 
                        onBlur={(event)=>setaddEvent({...addEvent,img:event.target.value})} />
                    </div>
                    <div>
                            <p className='font-weight-bold mb-0 mt-1 '>Banner</p><br/>
                            <div className='img-upload d-flex position-relative justify-content-center align-items-center border border-ifo rounded pl-3 '
                                style={{background:`url(${upload}) no-repeat`, backgroundSize:'28px 28px',width:'150px',height:'31px'}}>
                                <input style={{height:30,width:140,position:'absolute',top:0,left:0,opacity:0}} type="file"/>
                                <p className="font-weight-bold text-primary  ml-3 mt-2">Upload image</p>
                            </div>
                    </div>
                </Grid>
            </Grid>
            <button onClick={addEventHandler} 
                style={{height:'40px'}} 
                className='blue-button m-5 py-2 px-5 rounded float-right'>
                    <p className="font-weight-bold">Add Event</p>
            </button>
        </Grid>
    );
};

export default AddEvent;