import React, {
    Component
  } from "react";
  import Button from "./Button"
  const axios = require("axios");
  const cheerio = require("cheerio");
  
  const blueButton = {
    backgroundColor: "blue",
    padding: "5px",
    margin: "5px",
    borderRadius: "5px",
    borderColor: "black",
    color: "white"
  };
  
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
          $(".mw-body").each(function() {
            result.title = $(this).children("h1#firstHeading").text();
            result.image = $(this).find(".image").attr("href");
            result.url = `https://commons.wikimedia.org${result.image}`;
          });
      
          return result;
        }).then(result => {
          return axios.get(url).then(response => {
            const $ = cheerio.load(response.data);
      
            $(".fullImageLink").each(function (i, element) {
              result.image = $(this).children("a").attr("href");
            });
      
            return result;
          });
        })
        // .then(result => {
        //   // here you have the final result. oR just use it in the then directly above as needed.
        // });
      }
    }
  
    render() {
      return ( <
        Button id = {
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
        style = {
          blueButton
        }
        />
      )
    };
  }
  
  export default ScrapeButton;