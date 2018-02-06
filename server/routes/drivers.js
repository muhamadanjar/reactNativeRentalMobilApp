var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://arvanzark:greatknight1@ds115758.mlab.com:15758/rentalmobilapp", ["drivers"]);


//Get Single Driver
router.get("/driver/:id", function(req, res, next){
    db.drivers.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, driver){
        if (err){
            res.send(err);
        }
        res.send(driver);
    });
});

module.exports = router;
