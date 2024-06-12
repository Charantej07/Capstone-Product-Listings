const express = require("express");
const mongodb = require("mongodb");

const productController = require("../Controllers/productContoller");

const Router = express.Router();

Router.get("/fetch", productController.showAllProducts);
Router.post("/login", productController.login);
Router.post("/insertUser", productController.createUser);
Router.post("/insertProduct", productController.addToCart);
Router.delete("/deleteProduct", productController.reduceFromCart);
Router.post("/buyProduct", productController.buyNow);

module.exports = Router;
