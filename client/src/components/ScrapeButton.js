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

        $(".mw-body").each(function (i, element) {
          result.title = $(this).children("h1#firstHeading").text();
          result.image = $(this).find(".image").attr("href");
          // result.summary = $(this)
          //   .find("p").text();
          result.image = `https://commons.wikimedia.org${result.image}`
          result.url = url;
          axios.get(result.image).then(function (response) {
            const $ = cheerio.load(response.data);
            $(".fullImageLink").each(function (i, element) {
              result.image = $(this)
                .children("a").attr("href")
                console.log(result.image)
                return result;
            });
          });
        });
      })
      .then((result) => {
        // console.log(result)

        // return (result)
      });
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