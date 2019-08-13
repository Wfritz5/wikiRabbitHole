import React, { Component } from "react";
import { Button } from "reactstrap";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm.js";
import scrape from "../../utils/scrape"


class Home extends Component {


    state = {
        loggedIn: false,
        href: "",
        links: [],
        image: "",
        article: "",
        title: ""
    };

    componentDidMount() {
        // this.viewSavedArticles();
        this.loggedIn();
    }

    scrapeResource = (url) => {
        scrape(url, (result) => {
            this.setState({
                href: result.url,
                links: result.randomLinks,
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
            <div className="homeBox">
                {this.state.loggedIn ? (
                    <Button color="warning" block>View Saved Articles</Button>
                ) : (<></>)}
                <SearchForm scrape={(url) => this.scrapeResource(url)} />
            </div >
        );
    }
}

export default Home;