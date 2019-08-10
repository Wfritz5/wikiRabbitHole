import React, {
  Component
} from "react";
import styled from "styled-components";
import randButton from "../assets/random.svg";
const axios = require("axios");
const cheerio = require("cheerio");

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

    this.handleSubmit = event => {
      event.preventDefault();
      // this.setState({term: this.state.term})
      const url = `https://en.wikipedia.org/wiki/Special:Random`
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
          //   result.url = 
          result.url = `https://en.wikipedia.org/wiki/${result.title.replace(/ /g, "_")}`;
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