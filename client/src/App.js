import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchForm from "./components/SearchForm"
import Button from "./components/Button";

const redButton = {
  backgroundColor: "red",
  padding: "5px",
  margin: "5px",
  borderRadius: "5px",
  borderColor: "black",
  color: "black"
};


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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Wiki Rabbit Hole</h2>
        </div>
        <SearchForm />
        {/* This button will pull random wikipedia articles */}
        <Button 
        id={"random-search"}
        label={"Random"}
        onClick={this.handleSubmit}
        type={"submit"}
        style={redButton}
        />
      </div>
    );
  }
}

export default App;
