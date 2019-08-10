import React, { Component } from "react";
import Button from "./Button";
import styled from "styled-components";
import searchButton from "../search.png";
const axios = require("axios");
const cheerio = require("cheerio");

const Search = styled.button`
  background: url('${searchButton}') no-repeat;
  background-size:cover;
  background-size:contain;
  height:40px;
  width:40px;
  border:0;
  margin:2px 10px 0px 10px;
`;

class ScrapeButton extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = event => {
      event.preventDefault();
      // this.setState({term: this.state.term})
      const url = `https://en.wikipedia.org/wiki/${this.props.term}`
      // window.open(url)
      axios.get(url).then(response => {
        const result = {};
        const $ = cheerio.load(response.data);

        $(".mw-body").each(function (i, element) {
          result.title = $(this).children("h1#firstHeading").text();
          result.image = $(this).find(".image").attr("href");
          result.links = $(this).find("a").attr("href");
          // result.summary = $(this).find("p").text();
          result.image = `https://commons.wikimedia.org${result.image}`
          result.url = url;
          axios.get(result.image).then(function (response) {
            const $ = cheerio.load(response.data);
            $(".fullImageLink").each(function (i, element) {
              result.image = $(this).children("a").attr("href")
              console.log(result)
              return result;
            });
          });
        });
      })
      // .then((result) => {
      // console.log(result)

      // return (result)
      // });
    }
  }

  render() {
    return (<Search id={"submit-search"}
      label={"Submit"}
      onClick={this.handleSubmit}
      type={"submit"} />
    )
  };
}

export default ScrapeButton;