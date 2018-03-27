var express = require('express');
var router = express.Router();
const {imgFolder} = require('./constant');

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

        var newpath = '/Users/macbook/Documents/uploadFile/' + files.csv.name;
        if (fs.existsSync(path)) {
            newpath = '/Users/macbook/Documents/uploadFile/' + files.csv.name + file.csv.mtime;
            fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
              res.send(files.csv.name + file.csv.mtime)
              });
        }
        else fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.send(files.csv.name)
        });
    });
});

module.exports = router;