const router = require("express").Router();

router.get("/:theUrl/:linkCount",  function (req, res, next) {
    res.json({
            retString: "return val from scrape function call"
    });
});
    

module.export = router; 