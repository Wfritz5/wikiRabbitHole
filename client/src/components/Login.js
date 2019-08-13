import React from "react";
import styled from "styled-components";

const Label = styled.label`
color:white;
margin:0.5em;
`;
const FormGroup = styled.fieldset`
border:none;
`;
const Rule = styled.hr`
margin:1em;
`;
const SignUp = styled.a`
color:white;
text-decoration:none;
margin:0.5em;
text-align:right;
`;

const Title = styled.h2`
color:white;
`;

const Submit = styled.button`
background-color:#000000;
color:#DCDCDC;
border: 1px solid white;
border-radius:25px;
height:25px;
box-shadow: 0 0 10px #666666;
font-size:0.8em;
margin:0px 0px 2px 5%;`;

const Container = styled.div`
display:flex;
justify-content:center;
width:100%;
margin:5em;
`;

const P = styled.p`
color:white;
margin:0.5em;
text-align:right;
`;

const InputStyleR = {
    marginLeft: 0.2 + "em"
}

function Login(props) {
    return (
        <Container className="login">
            <Title className="loginTitle title-font">Login</Title>
            <Rule></Rule>
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
                        onChange={props.handleInputChange}
                        style={InputStyleR} />
                </FormGroup>
                <Submit
                    id="loginButton"
                    onClick={props.handleLogin}>
                    Login
                </Submit>
                <P className="signupLink">
                    <SignUp href="/signup">No account? Sign up here</SignUp>
                </P>
            </form>
        </Container>
    );
}

export default Login;