import React, {
    Component
} from "react";
import {
    Button
} from "reactstrap";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm.js";
import SlideNav from "../../components/SlideNav";
import Canvas from "../../components/three/canvas.js";
import scrape from "../../utils/scrape";
import styled from "styled-components";

const Container = styled.div `
position:relative;
width:100%;
clear:both;
`;

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            href: "",
            linkTitles: [],
            links: [],
            image: "",
            article: "",
            title: "",
            linkLength: 5,
            username: null,
            favorites: [],
            userId: null,
            tags: [],
            rabbitHole: []
        };
    }

    componentDidMount() {
        // this.viewSavedArticles();
        this.loggedIn();
    }


    loggedIn = () => {
        API.isLoggedIn().then(user => {
            console.log(user);
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    username: user.data.user.username,
                    favorites: user.data.user.rabUrl,
                    userId: user.data.user._id
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    addTags = () => {

    }

    addFavorite = () => {
        let req = {
            title: this.state.title,
            summary: this.state.summary,
            urlString: this.state.href,
            image: this.state.image,
            userId: this.state.userId,
            keywords: this.state.tags
        };
        API.addUrl(this.state.userId, req);
    }

    scrapeResource = (url) => {
        scrape(url, this.state.linkLength, (result) => {
            let links = [];
            let linkTitles = [];
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
                article: result.summary,
                title: result.title,
                rabbitHole: [...this.state.rabbitHole, this.state]
            })
            console.log(this.state);
        });
    }



    // viewSavedArticles = () => {}

    render() {
        return ( 
            <Container className = "homeBox" >
                <SearchForm scrape = {this.scrapeResource}/> 
                <SlideNav state = {this.state} addFavorite={this.addFavorite}></SlideNav> 
                <Canvas state = {this.state} scrape = {this.scrapeResource}/> 
            </Container>    
        );
    }
}

export default Home;