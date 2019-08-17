import React, { Component } from "react";
import { Button } from "reactstrap";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm.js";
import SlideNav from "../../components/SlideNav.js";
import Canvas from "../../components/three/canvas.js";
import scrape from "../../utils/scrape";
import styled from "styled-components";

const Container = styled.div`
position:relative;
width:100%;
clear:both;
`;

class Home extends Component {

   constructor(props){
       super(props)
        this.state = {
        loggedIn: false,
        href: "",
        linkTitles: [],
        links: [],
        image: "",
        article: "",
        title: "",
        linkLength: 5
    };}

    componentDidMount() {
        // this.viewSavedArticles();
        this.loggedIn();
    }

    scrapeResource = (url) => {
        scrape(url, (result) => {
            let links =[];
            let linkTitles=[];
            for (let i = 0; i < this.state.linkLength; i++) {
                links.push(result.randomLinks[i]);
                if (result.randomLinks[i]) {
                linkTitles.push(result.randomLinks[i].slice(19).replace(/_/gi, " "));
                }
            }
            this.setState({
                href: result.url,
                linkTitles: linkTitles,
                links: links,
                image: result.image,
                article: "",
                title: result.title
            })
            console.log(this.state);
        });
    }



    // viewSavedArticles = () => {}

    loggedIn = () => {
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

    render() {
        return (
            <Container className="homeBox">
                {this.state.loggedIn ? (
                    <Button color="warning" block>View Saved Articles</Button>
                ) : (<></>)}
                <SearchForm scrape={(url) => this.scrapeResource(url)} />
                <SlideNav></SlideNav>
                <Canvas state={this.state} scrape={(url) => this.scrapeResource(url)} />
            </Container >
        );
    }
}

export default Home;