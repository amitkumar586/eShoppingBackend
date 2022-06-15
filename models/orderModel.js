const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    shippingAddress:{
       type:String
    },
    phoneNo:{
       type:Number
    },

    itemName:{
        type:String
    },

    price:{
        type:Number
    },
    quantity:{
        type:Number
    },
    itemImage:{
        type:String
    },

    paidAt:{
        type:Date
    },

    itemsPrice:{
        type:Number,
        default:0

    },

    texPrice:{
        type:Number
    },

    shippingPrice:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },

    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    orderStatus:{
        type:String,
        default:"processing"
    },
    deliveredAt:Date,
});

const Order = new mongoose.model('ORDER', orderSchema);

module.exports = Order;
