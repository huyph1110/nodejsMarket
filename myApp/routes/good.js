var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://11.0.4.189:27017/";
/* GET goods listing. */
router.get('/', function(req, res, next) {

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      var dbo = db.db("local");
      dbo.collection("startup_log").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);

      db.close();
      });

    });

});





module.exports = router;