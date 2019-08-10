import React, {
  Component
} from "react";
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

class RandomButton extends Component {
  constructor(props) {
    super(props);

  }
  handleSubmit = event => {
    event.preventDefault();
    const url = `https://en.wikipedia.org/wiki/Special:Random`
    scrape(url)
  }


  render() {
    return ( < Random id = {
        "random-search"
      }
      label = {
        "Random"
      }
      onClick = {
        this.handleSubmit
      }
      type = {
        "submit"
      }
      />
    )
  };
}

export default RandomButton;