import React, { useEffect, useState, useContext } from 'react';
import { Grid } from '@material-ui/core';
import './Home.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
const Home = () => {

    const colors=['#3F82FC','#FFBD3F','#FF7004', '#cc6fb5f0'];
    const [user,setUser]=useContext(UserContext)
    const history=useHistory()

    const [allTasks, setAllTasks]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/allTasks')
        .then(res=>res.json() )
        .then(result=>{
            
            setAllTasks(result)
        })
        .catch(err=>alert(err))
    },[])

    const taskClickHandler = (task) =>{
      setUser({...user,event:task})
      history.replace('/registation-event')
    }

    return (
        <div>
            <div id='home-wrapper'>
                <div className='text-center my-5'>
                    <h2 className='m-5'>I GROW BY HELPING PEOPLE IN NEED</h2>
                        <input className='input' type="text" placeholder="Search"/>
                        <button className='blue-button' type="submit">Search</button>
                </div>
                <div className='mx-5'>
                    <Grid container item xs={12} spacing='7' justify='center'>
                    {   
                        allTasks.map(task=>{ 
                            const randomNumber = Math.floor(Math.random()*4);
                            return(
                                <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
                                    <Card className='rounded' style={{background:colors[randomNumber]}}>
                                        <CardActionArea >
                                            <CardMedia onClick={()=>taskClickHandler(task)}
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height='200'
                                            image={task.img}
                                            title="Contemplative Reptile"
                                            />
                                            <CardContent style={{color:'white'}}>
                                            <Typography gutterBottom >
                                                {task.name}
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Home;