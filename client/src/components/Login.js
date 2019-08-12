import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Label = styled.label`
color:white;
`;
const FormGroup = styled.fieldset`
border:none;
margin:0.5em;
`;

function Login(props) {
    return (
        <div className="login">
            <h2 className="loginTitle title-font">Login</h2>
            <hr />
            {props.message ? (
                <alert className="animated fadeIn" color="danger">{props.message}</alert>
            ) : (<></>)}
            <form>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        value={props.username}
                        onChange={props.handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <input type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={props.password}
                        onChange={props.handleInputChange} />
                </FormGroup>
                <button
                    id="loginButton"
                    onClick={props.handleLogin}
                    block>Login
                </button>
                <p className="signupLink">
                    <Link to="/signup">No account? Sign up here</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;