import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import config from './firebase.config';
import { Button } from 'react-bootstrap';
import { UserContext } from '../../App';

if(!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app();
}



const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            const credential = result.credential;
            const token = credential.accessToken;
            const {displayName, email} = result.user;
            const signedInUser = {name: displayName, email};
            setLoggedInUser(signedInUser);
            console.log(loggedInUser);
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
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