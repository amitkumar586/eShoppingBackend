const express = require('express');
const { newOrder, getSingleOrder, myOrders } = require('../controller/orderController');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const router  = express.Router();


router.route('/order/generate').post( isAuthenticatedUser , newOrder);   //isAuthenticatedUser ,
router.route('/order/:id').get( isAuthenticatedUser, getSingleOrder);//  authorizedRoles("admin") 
router.route('/orders/loginuser').get( isAuthenticatedUser, myOrders);

module.exports = router;