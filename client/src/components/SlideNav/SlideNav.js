import React, { Component } from 'react';
// import API from "../../utils/API";
import "./style.css";
// import styled from "styled-components";

export default class SlideNav extends Component {

    constructor(props) {
        super(props)

        this.state = {}

        this.mySidenav = React.createRef()
        this.main = React.createRef()
    }

    openNav() {
        this.mySidenav.current.style.width = "250px";
        this.main.current.style.marginLeft = "250px";
        console.log('open');
    }

    closeNav() {
        this.mySidenav.current.style.width = "0";
        this.main.current.style.marginLeft = "0";
        console.log('closed');
    }

    render() {
        return (
            <div className="wrapper">
                <div id="mySidenav" ref={this.mySidenav} className="sidenav">
                    <button
                        className="closebtn"
                        onClick={this.closeNav}>&times;
              </button>
                    {/* <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a> */}
                </div>

                <div id="main" ref={this.main}>
                    <button
                        onClick={this.openNav}>&#9776;
              </button>
                </div>
            </div>
        );
    }
}