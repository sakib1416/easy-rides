import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import config from './firebase.config';
import { Button } from 'react-bootstrap';

if(!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app();
}

const Login = () => {
    
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorMessage);
        })
    }
    return (
        <div>
            <h1>Login Page</h1>
            <Button onClick={handleGoogleSignIn}>Sign In With Google</Button>
        </div>
    );
};

export default Login;