const express = require("express");
const mongodb = require("mongodb");

const productController = require("../Controllers/productContoller");

const Router = express.Router();

Router.get("/fetch", productController.showAllProducts);
Router.get("/fetch/:id", productController.showProduct);
Router.post("/login", productController.login);
Router.post("/signup", productController.createUser);
Router.post("/addToCart", productController.addToCart);
Router.delete("/removeFromCart", productController.reduceFromCart);
Router.post("/buyProducts", productController.buyNow);

Router.post("/createProduct", productController.createProduct);
Router.post("/updateProduct", productController.updateProduct);
Router.delete("/deleteProduct", productController.deleteProduct);

module.exports = Router;
