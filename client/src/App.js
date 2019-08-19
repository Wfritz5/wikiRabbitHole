import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";


//*auth
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";

const Container = styled.div`
position:absolute;
display: grid;
grid-template-rows: 1fr 9fr;
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
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
