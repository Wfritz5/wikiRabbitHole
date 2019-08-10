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
border: 1px solid white;
padding:5px 10px;
border-radius: 15px;
height:10px;
background-color:#000000;
color:white;
width:50%;
box-shadow: 0 0 10px #666666;

`;

const Form = styled.form`
display:flex;
border: none;
border-radius: 3px;
width:100%;
align-content:center;
justify-content:center;
`

const Clear = styled.button`
background-color:#000000;
color:#DCDCDC;
border: 1px solid white;
border-radius:15px;
height:18px;
box-shadow: 0 0 10px #666666;
font-size:10px;
margin:2px 0px 0px 10px;`;


const Container = styled.div`
width: 70%;
align-content: center;
justify-content: center;
display: flex;
align-self:flex-end;
float:right;
margin: 0em 1em 0 0`

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
                        placeholder=". . ."
                        value={this.state.term} onChange={this.handleInputChange} />
                    {
                        /* This button will submit the form */
                    }
                    {
                        /* This button will clear the search field */
                    }
                    <Clear id={"clear-search"} label={"Clear"} onClick={() => this.setState({ term: "" })} type={"reset"}>clear</Clear>
                    <ScrapeButton term={this.state.term} />
                </Form >
            </Container>
        );
    }
}

export default SearchForm;