export default function randomLinkGenerator(links, num) {
    const arr = []
    const arrIndex = []
    while (arr.length < num) {
      const r = Math.floor(Math.random() * links.length);
      if (arrIndex.indexOf(r) === -1) {
      const randLink = `wikipedia.org${links[r]}`
      arr.push(randLink);
      arrIndex.push(r);
      }
    }
    return arr;
  }