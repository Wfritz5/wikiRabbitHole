import noImage from "../assets/noImage.svg"
const axios = require("axios");
const cheerio = require("cheerio");

export default function scrape(url) {
  axios.get(url).then(response => {
    const result = {};
    const linkArr = [];
    const $ = cheerio.load(response.data);
    $(".mw-body").each(function (i, element) {
      function randomLinkGenerator(links) {
        const arr = []
        while (arr.length < 5) {
          const r = Math.floor(Math.random() * links.length);
          if (arr.indexOf(r) === -1) {
          const randLink = `wikipedia.org${links[r]}`
          arr.push(randLink);
          }
        }
        return arr;
      }
      result.title = $(this).children("h1#firstHeading").text();
      // const title = result.title;
      // if (title.search("disambiguation")) {
      // result.summary = $(this).find("p").text();
      result.image = $(this).find(".image").attr("href");
      result.links = $(this).find("a");
      result.url = `https://wikipedia.org/wiki/${result.title.replace(/ /g, "_")}`;
      // push all links into an array
      $(result.links).each(function (i, link) {
        linkArr.push(`${$(link).attr('href')}`)
      });
      // filter the links to grab good urls
      result.filteredLinks = linkArr.filter(link => link.includes(`/wiki/`) && !link.includes(`:`) &&
        !link.includes(`%`))
      result.randomLinks = randomLinkGenerator(result.filteredLinks);
      // checks for a good image and then will grab its base code
      if (result.image) {
        // need to check for `https://en.wikimedia.org${result.image}` as well
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