import React, { Component } from 'react';
import API from "../../utils/API";
import "./style.css";
// import styled from "styled-components";

export default class SlideNav extends Component {

    constructor(props) {
        super(props)

        this.state = {
            navClass: "closed",
            displayClass: "visible"
        }
        this.mySidenav = React.createRef()
        this.main = React.createRef()
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this)
        this.handleFavorite = this.handleFavorite.bind(this)

    }

    openNav() {
        this.setState({
            navClass: "open",
            displayClass: "hidden"
        })
        console.log('open');
    }

    closeNav() {
        this.setState({
            navClass: "closed",
            displayClass: "visible"
        })
        console.log('closed');
    }

    handleFavorite(){
        API.addUrl(this.props.state.href,)
    }

    render() {
        return (
            <div className="wrapper">
                <div id="mySidenav" ref={this.mySidenav} className={`sidenav ${this.state.navClass}`}>
                    <button
                        className="closebtn"
                        onClick={this.closeNav}>&times;
              </button>
                    <article>
                        <img src={this.props.state.image} alt={this.state.title} />
                        <p onClick={this.handleFavorite()}>{this.props.state.article ? "\u269d add to favorites" : ""}</p>
                        <p id="summary">{this.props.state.article}</p>
                    </article>




                </div>

                <div id="main" ref={this.main}>
                    <button className={this.state.displayClass}
                        onClick={this.openNav}>&#9776;
              </button>
                </div>
            </div >
        );
    }
}