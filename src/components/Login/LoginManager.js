import firebase from "firebase/app";
import "firebase/auth";
import config from './firebase.config';

export const initializeLoginFramework = () => {
    if(!firebase.apps.length) {
        firebase.initializeApp(config);
      } else {
        firebase.app();
      }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(result => {
        const credential = result.credential;
        const token = credential.accessToken;
        const {displayName, email} = result.user;
        const signedInUser = {name: displayName, email};
        return signedInUser;
    })
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log(errorMessage);
    })
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(response => {
        const signedInUser = {
            name: '',
            email: ''
        };
        return signedInUser;
    })
}
