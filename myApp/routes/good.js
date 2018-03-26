var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

const {dbUrl} = require('./constant');

/* GET goods listing. */
router.get('/', function(req, res, next) {

  res.send('hello & welcome');

});

router.get('/getAll', function(req, res, next) {

    MongoClient.connect(dbUrl, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      var dbo = db.db("shoes_db");

      dbo.collection("products").find().toArray(function(err, result) {
      if (err) throw err;

      res.send(result);
    
      db.close();
      });

    });

});

router.get('/getTypes', function(req, res, next) {

    MongoClient.connect(dbUrl, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      var dbo = db.db("shoes_db");

      dbo.collection("productType").find().toArray(function(err, result) {
      if (err) throw err;

      res.send(result);
    
      db.close();
      });

    });

});
var url = require('url');

router.post('/insert', function(req,res,next) {

  res.send(req.body)

});

module.exports = router;