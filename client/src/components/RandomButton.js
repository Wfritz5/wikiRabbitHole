import React from "react";
import styled from "styled-components";
import randButton from "../assets/random.svg";
import randDetail from "../assets/random_detail.svg";
import scrape from "../utils/scrape"

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
  }`;

const RandomButton = () => {

  function handleSubmit(event) {
    event.preventDefault();
    const url = `https://en.wikipedia.org/wiki/Special:Random`
    scrape(url)
  }
  return ( < Random id = {
      "random-search"
    }
    label = {
      "Random"
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
export default RandomButton;