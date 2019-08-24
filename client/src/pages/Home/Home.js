import React, {
    Component
} from "react";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm.js";
import SlideNav from "../../components/SlideNav";
import Canvas from "../../components/three/canvas.js";
import Range from "../../components/Range.js";
import Map from "../../components/Map.js";
import scrape from "../../utils/scrape";
import styled from "styled-components";

const Container = styled.div `
position:absolute;
width:100%;
height:100%;
clear:both;
overflow:hidden;
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
            linkLength: 0,
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
        API.isLoggedIn().then(userData => {
            if(userData.data.loggedIn){
            API.getUserById(userData.data.user._id).then(user => {
                this.setState({
                    loggedIn: true,
                    username: user.data.username,
                    userId: user.data._id,
                    favorites: user.data.rabUrl
                });
            
        }).catch(err => {
            console.log(err);
        })}
    })}

    addTags = () => {

    }

    updateState = (stateIndex) => {
        this.setState(this.state.rabbitHole[stateIndex]);
    }

    updateLinkLength = (e) => {
        let val =e.target.value;
        this.setState({
            linkLength: val,
        })
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
        API.addUrl(this.state.userId, req).then(result => {
            API.getUserById(this.state.userId).then(user => {
                this.setState({
                    loggedIn: true,
                    username: user.data.username,
                    userId: user.data._id,
                    favorites: user.data.rabUrl
                });
            
        })})
    }

    deleteFavorite = (e) => {
        let id = e.target.dataset.rabid;
        API.deleteUrl(id).then(result=>{
            API.getUserById(this.state.userId).then(user => {
                
                this.setState({
                    favorites: user.data.rabUrl
                });
            
        }).catch(err => {
            console.log(err);
        })
        });
    }

    scrapeResource = (url) => {
        scrape(url, (result) => {
            let links = [];
            let linkTitles = [];
            let shown = 0.5;
            if(this.state.links.length){
                let prevCount = this.state.linkLength;
                let prevLength = this.state.links.length;
                shown = prevCount / prevLength;}
            for (let i = 0; i < 20; i++) {
                if (result.randomLinks[i]) {
                    links.push(result.randomLinks[i]);
                    linkTitles.push(result.randomLinks[i].slice(19).replace(/_/gi, " "));
                }
            }
            this.setState({
                href: result.url,
                linkTitles: linkTitles,
                links: links,
                linkLength:  result.randomLinks.length * shown,
                image: result.image,
                article: result.summary,
                title: result.title,
                rabbitHole: [...this.state.rabbitHole, this.state]
            })
        });
    }



    // viewSavedArticles = () => {}

    render() {
        return ( 
            <Container className = "homeBox" >
                <SearchForm scrape = {this.scrapeResource}/>  
                <SlideNav state = {this.state} addFavorite = {this.addFavorite} deleteFavorite= {this.deleteFavorite} />
                {this.state.links.length ? <Range update ={this.updateLinkLength} linkLength ={this.state.links.length}/> : <></>}
                <Canvas state = {this.state} scrape = {this.scrapeResource}/>  
                <Map store = {this.state.rabbitHole} update = {this.updateState}/> 
            </Container>
        );
    }
}

export default Home;