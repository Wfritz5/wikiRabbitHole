import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { Link } from "react-router-dom";

function Login(props) {
    return (
        <div className="login">
            <h2 className="loginTitle title-font">Login</h2>
            <Form>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        value={props.username}
                        onChange={props.handleInputChange}
                    />
                </FormGroup>
                <Button
                    id="loginButton"
                    onClick={props.handleLogin}
                    block>Login
                </Button>
                <p className="signupLink">
                    <Link to="/signup">No account? Sign up here</Link>
                </p>
            </Form>
        </div>
    );
}

export default Login;