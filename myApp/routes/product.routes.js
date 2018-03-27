module.exports = function (app) {
    var products = require('../controllers/product.controller.js');

    app.post('/products', products.create);
    app.put('/products/:productId',products.update);
    // app.put('/products/:productId', function (req, res) {
    //     res.send('PUT request to homepage');
    // });
}