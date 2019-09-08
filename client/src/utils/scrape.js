import noImage from "../assets/noImage.svg"
import randomLinkGenerator from "./randomLinkGenerator"
const axios = require("axios");
const cheerio = require("cheerio");

export default async function scrape(url, cb) {
  fetchResults(url);
  function fetchResults(query) {
    const result = {};
    const randomQuery = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random
&grnnamespace=0&prop=links|pageimages|info|extracts&exintro&explaintext&pllimit=max&inprop=url&origin=*&grnlimit=1`;
    const searchQuery = `https://en.wikipedia.org/w/api.php?action=query&titles=${query}&prop=links|pageimages|info|
    extracts&exintro&explaintext&pllimit=max&inprop=url&utf8=&format=json&origin=*`
      if (query === "Special:Random") {
        query = randomQuery
      } else {
        query = searchQuery;
      }
        console.log(query)
        fetch(query)
            .then(response => response.json())
            .then(data => {
              const pageIdArr = [Object.keys(data.query.pages)[0]];
              console.log(parseInt(pageIdArr[0]));
              const pageId = parseInt(pageIdArr[0]);
              const parsedData = data.query.pages[pageId];
              console.log(parsedData)
              // get links from the page and filter out any stubs or unwanted pages
              const linkArr = parsedData.links;
              const filteredLinks = linkArr.filter(link => !link.title.includes(`:`))
              result.links = filteredLinks;
              // grabs specified number of unique random numbers
                if (filteredLinks.length < 20) {
                  result.randomLinks = randomLinkGenerator(filteredLinks, filteredLinks.length);
                } else {
                  result.randomLinks = randomLinkGenerator(filteredLinks, 20);
                }
                if (parsedData.thumbnail) {
                  result.image = parsedData.thumbnail.source;
                } else {
                  result.image = noImage;
                }
              result.title = parsedData.title;
              result.url = parsedData.fullurl;
              result.summary = parsedData.extract;
              console.log(result)
              cb(result);
            }).catch(err => console.log(err));
      } 
}