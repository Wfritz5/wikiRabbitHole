import noImage from "../assets/noImage.svg"
const axios = require("axios");
const cheerio = require("cheerio");

export default function scrape (url) {
    // this.setState({term: this.state.term})
    // window.open(url)
    axios.get(url).then(response => {
      const result = {};
      const linkArr = [];
      const $ = cheerio.load(response.data);
      $(".mw-body").each(function (i, element) {
        result.title = $(this).children("h1#firstHeading").text();
        // const title = result.title;
        // if (title.search("disambiguation")) {
        // result.summary = $(this).find("p").text();
        result.image = $(this).find(".image").attr("href");
        result.links = $(this).find("a");
        $(result.links).each(function(i, link){
          linkArr.push($(link).attr('href'))
        });
        linkArr.splice(0, 3)
        console.log(linkArr)
        result.url = `https://en.wikipedia.org/wiki/${result.title.replace(/ /g, "_")}`;
        if (result.image){
          result.image = `https://commons.wikimedia.org${result.image}`
          axios.get(result.image).then(function (response) {
            const $ = cheerio.load(response.data);
            $(".fullImageLink").each(function (i, element) {
              result.image = $(this).children("a").attr("href")
              console.log(result)
              return result;
            });
          });
        } else {
          result.image = noImage;
          console.log("Image not found")
          console.log(result)
          return result
        }
        // } else {
        //     console.log("Disambiguation")
        // }
      });
    })
    // .then((result) => {
    // console.log(result)

    // return (result)
    // });
  }