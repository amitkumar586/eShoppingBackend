const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const productSchema = new mongoose.Schema({
  // productImage: [
  //     {

  //         public_id: {
  //             type: String,
  //             required: true
  //         },
  //         url: {
  //             type: String,
  //             required: true
  //         }

  //     }
  // ],

  productImage: {
    type: String,
    required: [true, "Please enter  product image"],
  },

  productName: {
    type: String,
    required: [true, "Please enter  product name"],
    trim: true,
  },

  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },

  category: {
    type: String,
    required: [true, "Please enter product category"],
  },

  // description: {
  //     type: String,
  //     // required:[true,"Please enter product Description"]
  // },

  stock: {
    type: Number,
    // required:[true,"Please Enter product stock"],
    default: 1,
  },

  numOfReviews: {
    type: Number,
    default: 1,
  },

  ratings: {
    type: Number,
    default: 0,
  },

  // reviews:[

  //     {
  //         name:{
  //             type:String,
  //             // required:true
  //         },
  //         rating:{
  //             type:Number,
  //             // required:true
  //         },
  //         comment:{
  //             type:String,
  //             // required:true
  //         },
  //     }
  // ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PRODUCT", productSchema);
