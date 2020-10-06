import React, { useContext, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import firebase from 'firebase';
import {
    Link, useHistory, useLocation
} from "react-router-dom";
import './Login.css'
import FirebaseConfig from './FirebaseConfig'

if(!firebase.apps.length){
    firebase.initializeApp(FirebaseConfig);
}

const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    var googleProvider = new firebase.auth.GoogleAuthProvider();

    function googleSignUp(){
        firebase.auth().signInWithPopup(googleProvider)
        .then((result)=>{
            sessionStorage.setItem('isLogged','true')
            const user=result.user
            sessionStorage.setItem('user',JSON.stringify({name:user.displayName,email:user.email}))
            history.replace(from);
        })
        .catch(err=>{
            alert(err.message)
        })
    }

    return (
        <div id='login-wrapper'>
            <h4>Login with</h4>
           
            <button onClick={googleSignUp} type="button" class="btn btn-light ">    Continue with Google</button><br/>
            <span>Don't have account?</span> <span><a href="/login">Create an account</a></span>
        </div>
    );
};

export default Login;