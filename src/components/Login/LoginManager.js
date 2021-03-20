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

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        //console.log(response);
        const newUserInfo = response.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
      })
      .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      })
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        const newUserInfo = response.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      }) 
}

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    })
    .then(response => {
      console.log("user name updated");
    })
    .catch(error => {
      console.log("There is an error", error);
    })
  }