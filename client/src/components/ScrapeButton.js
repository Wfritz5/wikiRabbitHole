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
      axios.get(url).then( (response) => {

        // Save an empty result object
        const result = {};

        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);
        // console.log(response.data)
        $(".mw-body").each(function (i, element) {

          // Add the href of every link, the title, a summary and save them as properties of the result object
          result.title = $(this)
            .children("h1#firstHeading").text();
          result.image = $(this)
            .find(".image").attr("href");

          const fullImage = `https://commons.wikimedia.org${result.image}`
          result.url = url;
          console.log(fullImage)
          return (fullImage);

          // result.summary = $(this)
          //   .find("p").text();

        });
      }).then((result) => {
        console.log(result)
        axios.get(url).then(function (response) {
          const $ = cheerio.load(response.data);
          $(".fullImageLink").each(function (i, element) {
            result.image = $(this)
              .children("a").attr("href")
          });
        });
        return (result)
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