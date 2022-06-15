const orderSchema = require("../models/orderModel");
//const user = require('../models/userModel'); 
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dlaaa",
  api_key: "773536879572886",
  api_secret: "blNnGTmJ3uQnKS2ChLmIeVsLuks",
});

// create product - admin
exports.newOrder = (req, res, next) => {
  console.log(req.body);
  const file = req.files.itemImage;

  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log(result);

    ///////////////////////
    const order = new orderSchema({
      shippingAddress: req.body.shippingAddress,
      phoneNo: req.body.phoneNo,
      itemName: req.body.itemName,
      price: req.body.price,
      quantity: req.body.quantity,
      itemImage: result.url,
      texPrice: req.body.texPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      product: req.body.product,
      user: req.body.user,
    });

    order
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          error: err,
        });
      });
    ///////////////////////
  });
};

// get single order
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await orderSchema
      .findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return next(
        res.status(404).json({
          success: false,
          message: `Order not found with this id`,
        })
      );
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

// get loggedin user orders
exports.myOrders = async (req, res, next) => {
  try {
    const orders = await orderSchema.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
  }
};
