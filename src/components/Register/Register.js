import React, {useState, useContext} from 'react';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework} from '../Login/LoginManager';

initializeLoginFramework();

const Register = () => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {register, handleSubmit, errors, watch} = useForm();
    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(response => setLoggedInUser(response))
    }
    const signOut = () => {
        handleSignOut()
        .then(response => {
            setLoggedInUser(response);
        });
    }
    const signUp = (data) => {
        console.log("Calling sing up", data);
        createUserWithEmailAndPassword(data.name, data.email, data.password)
        .then(response => {
            setNewUser(response);
            const {name, email} = response;
            const signedInUser = {name, email};
            setLoggedInUser(signedInUser);
            console.log(newUser);
        })
    }
    return (
        <div>
            <h1>This is register page</h1>
            <Form onSubmit={handleSubmit(signUp)}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" ref={register({required: "You must provide your full name"})} placeholder="Full Name" />
                        <Form.Text className="text-muted">
                            {errors.name && <div>{errors.name.message}</div>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" ref={register({
                            required: "You must provide an email",
                            validate: (value) => {
                                return (
                                    [/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i].every((pattern) => pattern.test(value))
                                    || "Invalid email address"
                                )
                            }
                            })} 
                            placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            {errors.email && <div>{errors.email.message}</div>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" ref={register({
                            required: "You must have to choose a password",
                            minLength: {
                                value: 8,
                                message: "Must be 8 characters"
                            },
                            validate: (value) => {
                                return (
                                    [/[a-z]/, /[A-Z]/, /[0-9]/].every((pattern) => pattern.test(value))
                                    || "lower case, upper case and a number required"
                                )
                            }
                        })} 
                        placeholder="Password" />
                        <Form.Text className="text-muted">
                        {errors.password && <div>{errors.password.message}</div>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirmPassword" ref={register({
                            required: "Please confirm your password",
                            validate: (value) => value === watch('password') || "Please match"
                            })} 
                            placeholder="Confirm Password" />
                        <Form.Text className="text-muted">
                        {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div><p>Already have an account? <Link to="/login">Login</Link> here</p></div>
                <br/>
                {
                    loggedInUser.email ? <Button onClick = {signOut}>Sign Out</Button> : <Button onClick={googleSignIn}>Sign In With Google</Button>
                }
        </div>
    );
};

export default Register;