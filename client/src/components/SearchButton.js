import React, {
  Component
} from "react";
import styled from "styled-components";
import searchButton from "../assets/search.svg";
import scrape from "../utils/scrape"

const Search = styled.button `
  background: url('${searchButton}') no-repeat;
  background-size:cover;
  background-size:contain;
  min-height:40px;
  min-width:40px;
  border:0;
  margin:2px 5% 0px 5%;
`;

class SearchButton extends Component {
  constructor(props) {
    super(props);

  }
  handleSubmit = event => {
    event.preventDefault();
    const url = `https://en.wikipedia.org/wiki/${this.props.term}`
    scrape(url)
  }


  render() {
    return ( < Search id = {
      "submit-search"
    }
    label = {
      "Submit"
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

export default SearchButton;