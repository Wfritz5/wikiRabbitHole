import React, { Component } from 'react';
import Button from "./Button"
import ScrapeButton from "./ScrapeButton"
import styled from "styled-components";
const axios = require("axios");
const cheerio = require("cheerio");

const Input = styled.input`
border-radius: 3px;
margin: 0.5em;
`;

const Form = styled.form`
padding: 0.5em;
margin: 0.5em;
border: none;
border-radius: 3px;
`

const redButton = {
    backgroundColor: "red",
    padding: "5px",
    margin: "5px",
    borderRadius: "5px",
    borderColor: "black",
    color: "black"
  };

const blueButton = {
    backgroundColor: "blue",
    padding: "5px",
    margin: "5px",
    borderRadius: "5px",
    borderColor: "black",
    color: "white"
  };  

class SearchForm extends Component {
    state = {
        term: ""
    }

    handleInputChange = event => {
        // update state of term
        this.setState({ term: event.target.value})
    }

    handleClear = event => {
        event.preventDefault();
        this.setState({ term: ""})
    };

    render() {
        return (
            <div>
            <Form id="wiki-form" onSubmit={event => event.preventDefault()}>
                <label htmlFor="wikiSearch">Wikipedia Search</label>
                <br />
                <Input    
                    type="text" 
                    name="wikiSearch" 
                    id="wikiSearch" 
                    placeholder="Search for an article" 
                    value={this.state.term}
                    onChange={this.handleInputChange}
                />
                {/* This button will submit the form */}
                <ScrapeButton term={this.state.term}
                />
                {/* This button will clear the search field */}
                  <Button 
                  id={"clear-search"}
                  label={"Clear"}
                  onClick={() => this.setState({ term: ""})}
                  type={"reset"}
                  style={blueButton}
                  />
            </Form>
            </div>
        );
    }
}

export default SearchForm;