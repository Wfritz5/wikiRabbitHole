import React, { Component } from "react";
import styled from 'styled-components';
import { Input } from "reactstrap"

const Label = styled.label`
color:white;
margin:0.5em;
`;
const FormGroup = styled.fieldset`
border:none;
`;
const Form = styled.form`
`;

const LogIn = styled.a`
color:white;
text-decoration:none;
margin:0.5em;
`;

const Title = styled.h2`
color:white;
`;

const P = styled.p`
color:white;
margin:0.5em;
text-align:right;
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

const Rule = styled.hr`
margin:1em;
`;

const InputStyleL = {
    marginLeft: 1 + "em"
}
const InputStyleR = {
    marginLeft: -0.2 + "em"
}

class Signup extends Component {
    state = {
        validateUsername: false,
        validatePassword: false,
        confirmPassword: false
    }

    componentDidUpdate() {
        this.validateUsername()
        this.validatePassword();
        this.confirmPassword();
    }

    validateUsername() {
        if (this.props.username.length > 1 && !this.state.validUsername) {
            this.setState({
                validUsername: true
            });
        }
        if (this.props.username.length < 1 && this.state.validUsername) {
            this.setState({
                validUsername: false
            });
        }
    }

    validatePassword() {
        let strongPassword = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
        let valid = strongPassword.test(this.props.password);
        if (!this.state.validPassword && valid) {
            this.setState({
                validPassword: true
            });
        }
        if (this.state.validPassword && !valid) {
            this.setState({
                validPassword: false,
            });
        }
    }

    confirmPassword() {
        if (this.props.password === this.props.confirmPassword && !this.state.confirmPassword && this.props.password) {
            this.setState({
                confirmPassword: true
            });
        }
        if (this.props.password !== this.props.confirmPassword && this.state.confirmPassword) {
            this.setState({
                confirmPassword: false
            });
        }
    }

    render() {
        return (
            <Container>
                <Title className="loginTitle title-font">Signup</Title>
                <Rule></Rule>
                {this.props.message ? (
                    <alert className="animated fadeIn" color="danger">{this.props.message}</alert>
                ) : (<></>)}
                <Form>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input style={InputStyleR} type="text" name="username" id="username" placeholder="username" value={this.props.username} onChange={this.props.handleInputChange} valid={this.state.validUsername} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="password" value={this.props.password} onChange={this.props.handleInputChange} valid={this.state.validPassword} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmPassword">Confirm</Label>
                        <Input style={InputStyleL} type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" value={this.props.confirmPassword} onChange={this.props.handleInputChange} valid={this.state.confirmPassword} />
                        <P><small>( at least 8 characters, 1 capital & 1 number )</small></P>
                    </FormGroup>
                    {/* if all fields are valid, allow the user to submit the form */}
                    {(this.state.validUsername && this.state.validPassword && this.state.confirmPassword) ? (
                        <Submit onClick={this.props.handleSignup} color="success" >Signup</Submit>
                    ) : (
                            <Submit onClick={this.props.handleSignup} color="danger" disabled>Signup</Submit>
                        )}
                    <P className="signupLink">
                        <LogIn href="/login">already signed up?  Login here</LogIn>
                    </P>
                </Form>
            </Container>
        );
    }
}

export default Signup;