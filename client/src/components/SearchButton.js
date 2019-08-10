import React from "react";
import styled from "styled-components";
import searchButton from "../assets/search.svg";
import searchDetail from "../assets/search_detail.svg"
import scrape from "../utils/scrape"



const SearchButton = props => {

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
`;



  function handleSubmit(event) {
    event.preventDefault();
    const url = `https://en.wikipedia.org/wiki/${props.term}`
    scrape(url)
  }
  return ( < Search id = {
      "submit-search"
    }
    label = {
      "Submit"
    }
    onClick = {
      handleSubmit
    }
    type = {
      "submit"
    }
    />
  )
}

export default SearchButton;