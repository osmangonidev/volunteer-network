import React, { useContext } from 'react';
import { FormControl, FormGroup,  Grid,  Input, InputLabel } from '@material-ui/core';
import firebase from 'firebase'
import firebaseConfig from '../../firebaseConfig'
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import google from '../../img/google.png'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function SignIn() {
  const [user,setUser]=useContext(UserContext)

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSigninHandler = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result=>{
      const user=result.user;
      setUser({...user, email:user.email, name:user.displayName, uid:user.uid, isSignedIn:true});
      storeAuthToken();
      history.replace(from);
    })
    .catch(error=>alert(error.message))
  }


// token verify
  const storeAuthToken=()=>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      sessionStorage.setItem('token',idToken);
    }).catch(function(error) {
      
    });
  }

  return (
   <div>
     <FormGroup className='w-25 py-5 mt-5 mx-auto bg-light border border-secondary rounded' >
       <h5 className='text-center pb-3'>Login With</h5>
        <Grid container item justify='center' alignItems='center' onClick={googleSigninHandler}
           className="border border-gray mx-3 w-75 mx-auto rounded">
          <Grid item>
            <img style={{width:'40px'}} src={google} alt=""/>
          </Grid>
          <Grid item >Continue with Google</Grid>
        </Grid>

        {
          user.isSignedUp ? 
            <div className="text-center mt-3">
            Don't have an account? 
            <span onClick={()=>setUser({...user,isSignedUp:false})} className='text-primary ml-1'>
              Create an account
            </span>
            </div>
          : <div className="text-center mt-3">
              Already have an account? 
            <span onClick={()=>setUser({...user,isSignedUp:true})} className='text-primary ml-1'>
                Signin
            </span>
            </div>
        }
    </FormGroup>
   </div>
  );
}
