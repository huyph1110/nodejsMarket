
var mongoose = require('mongoose');
mongoose.connect("mongodb://11.0.4.189:27017/shoes_db");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
var ProductSchema = mongoose.Schema({
    productId:String,
    productName: String,
    price: Number,
    ProductTypeId: String,
    SupplierId: Number,
    Decription: String,
    Status: String,
    Stock: String,
    ImageUrl: String,
    ColorId: String,
    ColorName: String
}, {
        timestamps: true
    });
module.exports = mongoose.model('Product', ProductSchema,"products");