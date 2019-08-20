

module.exports = {

    grabScrape:  function (req,res) {
        const theUrl = req.params.theUrl;
        const linkCount = req.params.linkCount;
        console.log("go to the grapScrape");
       /*  res.json({
            retString: "return val from scrape function call"
    }); */
    res.send(json({retString: "test response for grapScrape"}));
    return;
    }
};