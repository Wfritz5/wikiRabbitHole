import React from "react";
import styled from "styled-components";
import randButton from "../assets/random.svg";
import scrape from "../utils/scrape"

const Random = styled.button `
background: url('${randButton}') no-repeat;
background-size:contain;
min-height:40px;
min-width:40px;
border:0;
margin:2px 0px 0px 0px;`;

const RandomButton = () => {

  function handleSubmit (event) {
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