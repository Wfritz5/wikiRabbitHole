const router = require("express").Router();
const scrapeController = require("../../controllers/scrapeController");

/* router.get("/:theUrl/:linkCount",  function (req, res, next) {
    console.log("Got to scrape router call.")
    res.json({
            retString: "return val from scrape function call"
    });
}); */
    
router.route("/:theUrl/:linkCount")
    .get(scrapeController.grabScrape);


module.export = router; 