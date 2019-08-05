import React, { Component } from 'react';
import Button from "./Button"
// import styled from "styled-components";

// const FormWrapper = styled.section`
//   padding: 4em;
// `;

// const Form = styled.form`
// padding: 0.5em;
// margin: 0.5em;
// border: none;
// border-radius: 3px;
// `

class SearchBar extends Component {
    state = {
        term: ""
    }

    handleInputChange = event => {
        // update state of term
        this.setState({ term: event.target.value})
    }

    handleSubmit = event => {
        event.preventDefault();
        const url = `https://en.wikipedia.org/wiki/` + this.state.term
        alert(`The url is ` + url)
        window.open(url)
    };

    handleClear = event => {
        event.preventDefault();
        this.setState({ term: ""})
    };

    render() {
        return (
            <div>
            <form id="wiki-form" onSubmit={event => event.preventDefault()}>
            {/* <FormWrapper> */}
                <label htmlFor="wikiSearch">Wikipedia Search</label>
                <br />
                <input    
                    type="text" 
                    name="wikiSearch" 
                    id="wikiSearch" 
                    placeholder="Search for an article" 
                    value={this.state.term}
                    onChange={this.handleInputChange}
                />
                <Button 
                  id={"submit-search"}
                  label={"Submit"}
                  onClick={this.handleSubmit}
                  type={"submit"}
                />
                  <Button 
                  id={"clear-search"}
                  label={"Clear"}
                  onClick={() => this.setState({ term: ""})}
                  type={"reset"}
                  />
            {/* </FormWrapper> */}
            </form>
            </div>
        );
    }
}

export default SearchBar;