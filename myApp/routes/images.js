var express = require('express');
var router = express.Router();
const {imgFolder} = require('./constant');


var mongoose = require('mongoose');
mongoose.connect("mongodb://11.0.4.189:27017/shoes_db");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var ImagesSchema = mongoose.Schema({
    productId: String,
    ImageUrl: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('Image', ImagesSchema, "Images");

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/root/nodjsServer/nodejsMarket/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage }).single('image');
router.post('/profile', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading 
            res.send(err);
            return;
        }

        res.status(200).json(
            [{ message: req.file.fieldname }]
        );
        
        return;
        // Everything went fine 
    });
    
});

router.get('/:name', function(req, res, next) {

    //test download 

    var fs = require('fs');
 
 
   fs.readFile(imgFolder + req.params.name, function (err, content) {
        if (err) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(err);
            res.end("No such file");    
        } else {
            //for html show image
            res.writeHead(200, {'Content-Type': 'image/gif' });
            //for download
            //res.setHeader('Content-disposition', 'attachment; filename='+query.file);
            res.end(content);
        }
    });

});
//test upload 
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

router.get('/fileupload/upload', function(req, res, next) {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="progress" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});

router.post('/fileupload/progress', function(req, res, next) {

    var form = new formidable.IncomingForm();


    form.parse(req, function (err, fields, files) {
        //res.send(files)

        var oldpath = files.csv.path;

        var newpath = '/root/nodjsServer/nodejsMarket/images/' + files.csv.name;
        
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.status(200).send([{name: files.csv.name}]);
            
        });   
    });
});

module.exports = router;