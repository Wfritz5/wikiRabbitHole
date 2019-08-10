const axios = require("axios");
const cheerio = require("cheerio");

export default function scrape (url) {
    // this.setState({term: this.state.term})
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