import React, { Component } from 'react';
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
        this.closeNav = this.closeNav.bind(this);
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
                        <p id="summary">{this.props.state.article}</p>
                        <p id="favorite" onClick={this.props.addFavorite}>{this.props.state.article ? "\u269d add to favorites" : ""}</p>

                    </article>
                    <div id="user-profile">
                        <h2>{this.props.state.username}</h2>
                        <h3>{this.props.state.favorites}</h3>
                    </div>
                </div>

                <div id="main" ref={this.main}>
                    <button className={this.state.displayClass}
                        onClick={this.openNav}>. . .see more
              </button>
                </div>
            </div >
        );
    }
}