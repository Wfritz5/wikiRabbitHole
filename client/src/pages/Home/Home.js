import React, { Component } from "react";
import { Button } from "reactstrap";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm.js";
import Canvas from "../../components/three/canvas.js";
import scrape from "../../utils/scrape";


class Home extends Component {


    state = {
        loggedIn: false,
        href: "",
        links: [],
        image: "",
        article: "",
        title: "",
        linkLength: 5
    };

    componentDidMount() {
        // this.viewSavedArticles();
        this.loggedIn();
    }

    scrapeResource = (url) => {
        scrape(url, (result) => {
            console.log(result.randomLinks);
            for (let i = 0; i < this.state.linkLength; i++) {
                console.log(result.randomLinks[i])
                this.state.links.push(result.randomLinks[i].slice(19).replace(/_/gi, " "));

            }
            this.setState({
                href: result.url,
                image: result.image,
                article: "",
                title: result.title
            })
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
            <div className="homeBox">
                {this.state.loggedIn ? (
                    <Button color="warning" block>View Saved Articles</Button>
                ) : (<></>)}
                <SearchForm scrape={(url) => this.scrapeResource(url)} />
                <Canvas state={this.state} scrape={(url) => this.scrapeResource(url)} />
            </div >
        );
    }
}

export default Home;