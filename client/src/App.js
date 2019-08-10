import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchForm from "./components/SearchForm"
import Button from "./components/Button";
import styled from "styled-components";


//*auth
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";

const redButton = {
  backgroundColor: "red",
  padding: "5px",
  margin: "5px",
  borderRadius: "5px",
  borderColor: "black",
  color: "black"
};

const Container = styled.div`
width:100vw;
height:100vh;
background-color:#111111;
`;

class App extends Component {

  handleSubmit = event => {
    event.preventDefault();
    // const url = `https://en.wikipedia.org/wiki/${this.state.term}`
    // alert(`The url is ` + url)
    // window.open(url)
    // this.setState({ term: ""})
    alert("random")
  };

  render() {
    return (
      <Container>
        <Router>
          <TopNav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />
            <Route exact path="/login" render={(props) => <Auth {...props} action="login" />} />
            <Route exact path="/profile" component={Profile} />
            <Route component={NoMatch} />
            //*Button?
            <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Wiki Rabbit Hole</h2>
              </div>
              {/* This button will pull random wikipedia articles */}
            </div>
          </Switch>
          <SearchForm />
        </Router>
      </Container>
    );
  }
}

export default App;
