var Product = require("../models/product.model.js");

exports.create = function (req, res) {
    if (!req.body.productName) {
        return res.status(400).send({ message: "productName can not be empty" });
    }  

    var product1 = new Product({
        productName: req.body.productName,
        price: req.body.price,
        ProductTypeId: req.body.ProductTypeId,
        SupplierId: req.body.SupplierId,
        Decription: req.body.Decription,
        Status: req.body.Status,
        Stock: req.body.Stock,
        ImageUrl: req.body.ImageUrl
    });

    product1.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating the Note." });
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res){
    
    Product.findById(req.body.ProductTypeId, function (err, product) {
        if (!err) {
            return res.send(err);
        } 
        if (!product) {
            return res.send("Not found product with id");
        }

        product.productName = req.body.productName;
        product.price = req.body.price;
        product.ProductTypeId = req.body.ProductTypeId;
        product.SupplierId = req.body.SupplierId;
        product.Decription = req.body.Decription;
        product.Status = req.body.Status;
        product.Stock = req.body.Stock;
        product.ImageUrl = req.body.ImageUrl;

        Product.save(function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "Some error occurred while update the Product." });
            } else {
                res.send(data);
            }
        });
        //
    });
};


// PUT, DELETE, POST
