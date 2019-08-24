import React, {
    Component
} from 'react';

import styled from "styled-components";
import searchButton from "../assets/search.svg";
import searchDetail from "../assets/search_detail.svg"
import randButton from "../assets/random.svg";
import randDetail from "../assets/random_detail.svg";

const Input = styled.input `
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
&:focus {
    outline: 0;
}
`;

const Search = styled.button `
background: url('${searchButton}') no-repeat;
background-size:cover;
background-size:contain;
min-height:40px;
min-width:40px;
border:0;
margin:2px 5% 0px 5%;
transition: background 0.2s;
&:hover{
background: url('${searchDetail}') no-repeat;
background-size:50%;
}

&:focus {
    outline: 0;
}
`;

const Random = styled.button `
background: url('${randButton}') no-repeat;
background-size:contain;
min-height:40px;
min-width:40px;
border:0;
margin:2px 0px 0px 0px;
transition: background 0.2s;
&:hover{
  background: url('${randDetail}') no-repeat;
  background-size:50%;
  }
&:focus {
    outline: 0;
}`;

const Form = styled.form `
display:flex;
border: none;
border-radius: 3px;
float:right;
width:70%;
align-content:center;
justify-content:center;
`

const Clear = styled.button `
background-color:#000000;
color:#DCDCDC;
border: 1px solid white;
border-radius:25px;
height:25px;
box-shadow: 0 0 10px #666666;
font-size:0.8em;
margin:0px 0px 2px 5%;
&:focus {
    outline: 0;
}`;


const Container = styled.div `
position:relative;
width: 100%;
align-content: center;
justify-content: center;
display: flex;
margin-top:5em;
z-index:1000;`

class SearchForm extends Component {
    constructor(props) {
        super();
    }
    state = {
        term: ""
    }

    handleInputChange = event => {
        // update state of term
        this.setState({
            term: event.target.value
        })
    }



    search = (event, url) => {
        event.preventDefault();
        this.props.scrape("https://en.wikipedia.org/wiki/" + url);
        this.setState({term:""});
    }

    random = (event) => {
        event.preventDefault();
        this.props.scrape("https://en.wikipedia.org/wiki/Special:Random");
    }

    render() {
        return ( 
            <Container>
                <Form id = "wiki-form" onSubmit = {(e) => {this.search(e, this.state.term)}}>
                    <Clear id = {"clear-search"} label = {"Clear"} onClick = {() => this.setState({term: ""})} type = {"reset"}> clear </Clear>
                    <Input type = "text"  name = "wikiSearch"  id = "wikiSearch" placeholder = ". . ." value = {this.state.term}  onChange = {this.handleInputChange} />
                    <Random type='button' id = {"random-search"} label = {"Random"} onClick = {(e) => {this.random(e)}} /> 
                    <Search type ="submit" />
                </Form> 
            </Container>
                );
    }
}

export default SearchForm;