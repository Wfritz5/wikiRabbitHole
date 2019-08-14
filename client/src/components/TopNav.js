import React, { Component } from "react";
import API from "../utils/API";
// import {
//     Collapse,
//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink,
//     UncontrolledDropdown,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem,
// } from 'reactstrap';
import styled from "styled-components";
import logo from "../assets/logo.svg";


const Navigation = styled.nav`
display:inline-block;
width:100%;
z-index:1000;
position:relative;
`;

const LogoImg = styled.img`
display:inline-block;
height:50px;
width:auto;

`;

const Project = styled.h2`
color:#FFFFFF;
display:inline-block;
margin:0.5em;
`;

const Navlink = styled.a`
color:#FFFFFF;
margin:0.5em;
text-decoration:none;
`;

const Auth = styled.nav`
margin:0.5em;
float:right;
text-align:right;
width:40%
`;

const Brand = styled.div`
float:left;
margin:0.5em 1.5em 0em 1.5em;
width:40%;

`;
export default class TopNav extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loggedIn: false
        };
    }

    componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    logout() {
        API.logout().then((data) => {
            window.location.pathname = "/"
        }).catch((err) => {
            console.log(err)
        })
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (

            <Navigation>
                <Auth>
                    <Navlink href="/signup">signup</Navlink>
                    <Navlink href="/login">login</Navlink>
                </Auth>
                <Brand>
                    <a href="/"><LogoImg src={logo}></LogoImg></a>
                    <Project>rabbithole</Project>
                </Brand>

            </Navigation>
            // <div>
            //     <Navbar className="navbar" light expand="md">
            //         <NavbarBrand href="/" className="titleFont"><i className="fas fa-key"></i> React Auth</NavbarBrand>
            //         <NavbarToggler onClick={this.toggle} />
            //         <Collapse isOpen={this.state.isOpen} navbar>
            //             <Nav className="ml-auto" navbar>
            //                 <NavItem>
            //                     <NavLink href="/"><i className="fas fa-home light-text"></i></NavLink>
            //                 </NavItem>
            //                 <UncontrolledDropdown nav inNavbar>
            //                     <DropdownToggle nav caret>
            //                         <i className="fas fa-user light-text"></i>
            //                     </DropdownToggle>
            //                     <DropdownMenu right>
            //                         {this.state.loggedIn ? (
            //                             <>
            //                                 <DropdownItem>
            //                                     {/* <NavLink href="/profile">Profile</NavLink> */}
            //                                 </DropdownItem>
            //                                 <DropdownItem>
            //                                     <NavLink onClick={this.logout}>Logout</NavLink>
            //                                 </DropdownItem>
            //                             </>
            //                         ) : (
            //                                 <>
            //                                     <DropdownItem>
            //                                         <NavLink href="/login">login</NavLink>
            //                                     </DropdownItem>
            //                                     <DropdownItem>
            //                                         <NavLink href="/signup">signup</NavLink>
            //                                     </DropdownItem>
            //                                 </>
            //                             )}
            //                     </DropdownMenu>
            //                 </UncontrolledDropdown>
            //             </Nav>
            //         </Collapse>
            //     </Navbar>
            // </div>
        );
    }
}