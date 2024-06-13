const express = require("express");
const mongoose = require("mongoose");

const Product = require("../Models/Product");
const User = require("../Models/User");
const Cart = require("../Models/Cart");

const createUser = async (req, res) => {
  console.log(req.body);
  const { u_id, u_name, u_email, u_pwd, u_addr, u_contact } = req.body;
  try {
    const existingUser = await User.findOne({ u_email });
    if (existingUser) {
      return res.status(400).send("Email already exist");
    }

    const newUser = new User({
      u_id,
      u_name,
      u_email,
      u_pwd,
      u_addr,
      u_contact,
    });
    await newUser.save();
    res.status(201).send("User registered succesfully");
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send("Internal server error");
  }
};

const login = async (req, res) => {
  const { u_name, u_pwd } = req.body;
  const user = await User.findOne({ u_name, u_pwd });
  console.log(user);
  if (user) {
    res.send("Login succesfull");
  } else {
    res.send("Login unsuccesfull");
  }
};

const showAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

const addToCart = async (req, res) => {
  // console.log(req.body);
  const { user_id, product_id } = req.body;
  try {
    let cart = await Cart.findOne({ user_id: user_id });
    if (!cart) {
      cart = new Cart({
        user_id: user_id,
        items: [{ product_id: product_id, count: 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product_id.toString() === product_id
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].count += 1;
      } else {
        cart.items.push({ product_id: product_id, count: 1 });
      }
    }
    await cart.save();
    res.status(200).send("Item added to cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const reduceFromCart = async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    const cart = await Cart.findOne({ user_id: user_id });

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product_id.toString() === product_id
    );

    if (itemIndex > -1) {
      if (cart.items[itemIndex].count > 1) {
        cart.items[itemIndex].count -= 1;
      } else {
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();
      res.status(200).send("Item removed from cart");
    } else {
      res.status(404).send("Product not found in cart");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const buyNow = async (req, res) => {
  const { user_id } = req.body;

  try {
    const cart = await Cart.findOne({ user_id: user_id }).populate(
      "items.product_id"
    );

    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    let totalCost = 0;
    cart.items.forEach((item) => {
      totalCost += item.count * item.product_id.p_cost;
    });

    cart.items = [];
    await cart.save();

    res.status(200).send({
      message: "Purchase successful",
      totalCost: totalCost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const existingProduct = await Product.findOne(product);
    if (existingProduct) {
      res.status(400).send("Product already existed");
    }
    const newProduct = Product.create(product);
    (await newProduct).save();
    res.status(200).send("Product added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};



module.exports = {
  createUser,
  login,
  showAllProducts,
  addToCart,
  reduceFromCart,
  buyNow,
  createProduct,
};
