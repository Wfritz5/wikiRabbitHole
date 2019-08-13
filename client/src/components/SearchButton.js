import React from "react";
import styled from "styled-components";
import searchButton from "../assets/search.svg";
import searchDetail from "../assets/search_detail.svg"




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




  return ( < Search id = {
      "submit-search"
    }
    label = {
      "Submit"
    }
    type = {
      "submit"
    }
    />
  )
}

export default SearchButton;