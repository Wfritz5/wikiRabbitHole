import React, { Component } from "react";
import { Button } from "reactstrap";
import API from "../../utils/API";

class Home extends Component {

    state = {
        loggedIn: false,
    };

    componentDidMount() {
        // this.viewSavedArticles();
        this.loggedIn();
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
            </div>
        );
    }
}

export default Home;