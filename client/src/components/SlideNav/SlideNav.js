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
    }

    openNav=()=> {
        this.setState({
            navClass: "open",
            displayClass: "hidden"
        })
        console.log('open');
    }

    closeNav=()=> {
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
                        <p id="summary">{this.props.state.article}<a href={this.props.state.href}>more at Wikipedia</a></p>
                       {this.props.state.loggedIn ? <p id="favorite" onClick={this.props.addFavorite}>{this.props.state.article ? "\u269d add to favorites" : ""}</p> : <></>}

                    </article>
                    <div id="user-profile">
                    {this.props.state.loggedIn ? 
                    <div>
                        <h2>{this.props.state.username}</h2>
                        <h3>favorites</h3>
                        <hr />
                        {this.props.state.favorites.map((favorite, i)=>(
                            <li key={i}>
                            <span class="favorite">{favorite.title}</span>
                        
                            <a class='wiki' key={i} href={favorite.urlString} rel="noopener noreferrer" target="_blank"> wiki</a>
                            <p onClick={this.props.deleteFavorite}>Delete Me</p>
                            
                            </li>
                        
                        ))}
                        </div>
                        :
                    <h3>signup or login to access and organize starred links</h3>}
                    </div>
                </div>

                {this.props.state.links.length ? 
                <div id="main" ref={this.main}>
                    <button className={this.state.displayClass}
                        onClick={this.openNav}>. . . see more
                    </button>
                </div>:
                <></>}
            </div >
        );
    }
}