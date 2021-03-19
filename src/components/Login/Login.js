import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { UserContext } from '../../App';
import { handleGoogleSignIn, handleSignOut, initializeLoginFramework} from './LoginManager';
import { useForm } from "react-hook-form";

initializeLoginFramework();


const Login = () => {
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
    return (
        <div>
            <h1>Login Page</h1>
            
            {
                loggedInUser.email ? <Button onClick = {signOut}>Sign Out</Button> : <Button onClick={googleSignIn}>Sign In With Google</Button>
            }
            <br/>
            <div style={{width: '50%'}}>
                <Form onSubmit={handleSubmit((user) => {
                    console.log(user);
                })}>
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
                            })} placeholder="Enter email" />
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
                        })
                            } placeholder="Password" />
                        <Form.Text className="text-muted">
                        {errors.password && <div>{errors.password.message}</div>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="confirmPassword" ref={register({
                            required: "Please confirm your password",
                            validate: (value) => value === watch('password') || "Please match"
                            })} placeholder="Confirm Password" />
                        <Form.Text className="text-muted">
                        {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            
        </div>
    );
};

export default Login;