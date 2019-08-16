import React, { Component } from 'react';
import API from "../utils/API";
import styled from "styled-components";

const SlideNavigation = styled.nav`

`;




export default class SlideNav extends Component {

    openSlideNav() {
        //*need to add media queries 670px 
        document.getElementById("mySlidenav").styles.width = "670px";
    }

    closeSlideNav() {
        document.getElementById("mySlidenav").styles.width = "0";
    }

    render() {
        return (
            <SlideNavigation
                id="mySlidenav"
                className="SlideNav">
                <a
                    href="javascript:void(0)"
                    className="closeSlideBtn"
                    onClick="closeSlideNav()">&times;
                </a>

                <span
                    className="slideOutNav"
                    styles="font-size:30px;cursor:pointer"
                    onClick="openSlideNav()">&#9776;
                </span>
            </SlideNavigation>

        )
    }
}
