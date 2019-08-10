import React, {
    Component
} from 'react';
import RandomButton from "./RandomButton"
import SearchButton from "./SearchButton"
import styled from "styled-components";

const Input = styled.input`
border: 1px solid white;
padding:5px 10px;
border-radius: 15px;
height:13px;
min-width:130px;
background-color:#000000;
color:white;
width:50%;
box-shadow: 0 0 10px #666666;
margin:0px 5% 0px 5%;
`;

const Form = styled.form`
display:flex;
border: none;
border-radius: 3px;
float:right;
width:70%;
align-content:center;
justify-content:center;
`

const Clear = styled.button`
background-color:#000000;
color:#DCDCDC;
border: 1px solid white;
border-radius:25px;
height:25px;
box-shadow: 0 0 10px #666666;
font-size:0.8em;
margin:0px 0px 2px 5%;`;


const Container = styled.div`
width: 100%;
align-content: center;
justify-content: center;
display: flex;
align-self:flex-end;
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
                    <Clear id={"clear-search"} label={"Clear"} onClick={() => this.setState({ term: "" })} type={"reset"}> clear </Clear>

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
                    <RandomButton
                        id={"random-search"}
                        label={"Random"}
                        onClick={this.handleSubmit}
                        type={"submit"} 
                        />
                    <SearchButton 
                    term={this.state.term}
                    />
                </Form >
            </Container >
        );
    }
}

export default SearchForm;