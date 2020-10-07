import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import logo from '../../img/logo.png'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [user]=useContext(UserContext)
    return (
        <div>
            <Grid container item xs={12} style={{padding:'10px 20px'}} alignItems='center' >
                
                <Grid item  xs={12}  md={6}>
                    <Link className='link' to='/'>
                        <img style={{height:'64px'}} src={logo} alt="volunteer network logo"/>
                    </Link>
                </Grid>
                
                <Grid container item xs={12} md={6} justify='space-between' alignItems='center' spacing={1} style={{paddingRight:'10px'}}>
                    <Grid item xs={12} md={2}><Link to='/' className='link text-decoration-none'><b>Home</b></Link></Grid>
                    <Grid item xs={12} md={2}><Link to='/donation' className='link text-decoration-none'><b>Donation</b></Link></Grid>
                    <Grid item xs={12} md={2}><Link to='/events' className='link text-decoration-none'><b>Events</b></Link></Grid>
                    <Grid item xs={12} md={2}><Link to='/blog' className='link text-decoration-none'><b>Blog</b></Link></Grid>
                    {
                        user.isSignedIn ? <Grid item xs={12} md={2}><p className='text-info pt-2 font-weight-bold'>{user.name || 'User'} </p></Grid>
                        
                        : <Grid item xs={12} md={2} >
                            <Link to='/signIn' className='link text-decoration-none'>
                            <Button  variant="contained" className='bg-info text-white'> Register</Button>
                            </Link>
                        </Grid>
                    }
                    <Grid item xs={12} md={2}>
                    <Link to='/admin' className='link text-decoration-none'>
                        <Button variant="contained" className='bg-dark text-white'>Admin</Button>
                    </Link>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Header;