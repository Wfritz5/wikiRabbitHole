import noImage from "../assets/noImage.svg"
import randomLinkGenerator from "./randomLinkGenerator"
const axios = require("axios");
const cheerio = require("cheerio");

export default async function scrape(url, linkCount, cb) {
  axios.get(url, {
    validateStatus: function (status) {
      return status < 500;
    },
    headers: {
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
    }
  }).then(response => {
    const result = {};
    const linkArr = [];
    const $ = cheerio.load(response.data);
    $(".mw-body").each(function (i, element) {
      result.title = $(this).children("h1#firstHeading").text();
      result.summary = `${$(this).find("p").text().slice(0,300).replace(/ *\[[^\]]*]/, '')}...`;
      result.image = $(this).find(".image").attr("href");
      const links = $(this).find("a");
      result.url = `https://wikipedia.org/wiki/${result.title.replace(/ /g, "_")}`;
      // push all links into an array
      $(links).each(function (i, link) {
        linkArr.push(`${$(link).attr('href')}`)
      });
      // filter the links to grab good urls
      const filteredLinks = linkArr.filter(link => link.includes(`/wiki/`) && !link.includes(`:`) &&
        !link.includes(`%`) && !link.includes(`#`))
      // grabs specified number of unique random numbers
      if (filteredLinks.length < 5) {
        result.randomLinks = randomLinkGenerator(filteredLinks, filteredLinks.length);
      } else {
        result.randomLinks = randomLinkGenerator(filteredLinks, linkCount);
      }
      // checks for a good image and then will grab its base code
      if (result.image) {
        result.image = `https://wikipedia.org${result.image}`;
        axios.get(result.image).then(function (response) {
          const $ = cheerio.load(response.data);
          $(".fullImageLink").each(function (i, element) {
            result.image = $(this).children("a").attr("href")
            console.log(result)
            cb(result);
          });
        }).catch(err => console.log(err));
      } else {
        result.image = noImage;
        console.log(result)
        cb(result);
      }
    });
  }).catch(err => console.log(err));
}