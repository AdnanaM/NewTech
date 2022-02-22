const express = require('express');
var productRouter = express.Router();
var productController = require('./ProductController');
var authController = require('../users/AuthController');

productRouter.get('/',authController.protectSystem, authController.isAdmin, productController.getProducts);

productRouter.get('/', productController.getProducts);
productRouter.post('/', productController.createProduct);
productRouter.get('/:id', productController.getProductById);
productRouter.patch('/:id', productController.updateProductById);
productRouter.delete('/:id', productController.deleteProductById);
productRouter.get('/get/statistics', productController.getStatistics);

module.exports = productRouter;
