import React, {
    Component
} from 'react';
import Button from "./Button"
import ScrapeButton from "./ScrapeButton"
import styled from "styled-components";
import randButton from "../random.png";

const Random = styled.button`
background: url('${randButton}') no-repeat;
background-size:contain;
height:40px;
width:40px;
border:0;
margin:2px 10px 0px 10px;`;

const Input = styled.input`
border: 1px solid black;
padding:5px;
border-radius: 15px;
height:10px;
`;

const Form = styled.form`
display:flex;
margin: 0.5em;
border: none;
border-radius: 3px;
`

const Clear = styled.button`
background-color:#FFFFFF;
border: 1px solid black;
border-radius:15px;
height:24px;
`;

const Container = styled.div`
width:100%;
align-content:center;
justify-content:center;
display:flex;
`

class SearchForm extends Component {
    state = {
        term: ""
    }

    handleInputChange = event => {
        // update state of term
        this.setState({
            term: event.target.value
        })
    }

    handleClear = event => {
        event.preventDefault();
        this.setState({
            term: ""
        })
    };

    render() {
        return (
            <Container >
                <Form id="wiki-form" onSubmit={event => event.preventDefault()} >
                    {/* <label htmlFor="wikiSearch"> Wikipedia Search </label> */}
                    <Random
                        id={"random-search"}
                        label={"Random"}
                        onClick={this.handleSubmit}
                        type={"submit"} />
                    <Input type="text"
                        name="wikiSearch"
                        id="wikiSearch"
                        placeholder="Search for an article"
                        value={this.state.term} onChange={this.handleInputChange} />
                    {
                        /* This button will submit the form */
                    }
                    <ScrapeButton term={this.state.term} />
                    {
                        /* This button will clear the search field */
                    }
                    <Clear id={"clear-search"} label={"Clear"} onClick={() => this.setState({ term: "" })} type={"reset"}>clear</Clear>
                </Form >
            </Container>
        );
    }
}

export default SearchForm;