import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../../App';
import { handleGoogleSignIn, handleSignOut, signInWithEmailAndPassword} from './LoginManager';
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';



const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState({});
    const {register, handleSubmit, errors, watch} = useForm();
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
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
    const signIn = (data) => {
        signInWithEmailAndPassword(data.email, data.password)
        .then(response => {
            const {displayName, email} = response;
            const signedInUser = {name: displayName, email};
            setLoggedInUser(signedInUser);
            history.replace(from);
            console.log(response);
        })
    }
    return (
        <div>
            <h1>Login Page</h1>
            
            {
                loggedInUser.email ? <Button onClick = {signOut}>Sign Out</Button> : <Button onClick={googleSignIn}>Sign In With Google</Button>
            }
            <br/>
            <div>
                <Form onSubmit={handleSubmit(signIn)}>
                    
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <div><p>Don't have an account? <Link to="/register">Register</Link> here</p></div>
            </div>
            
        </div>
    );
};

export default Login;