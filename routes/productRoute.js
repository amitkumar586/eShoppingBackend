const express = require('express');

const { createProduct , getAllProducts , updateProduct , deleteProduct , getSingleProduct} = require('../controller/productController');
const { isAuthenticatedUser , authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get( getAllProducts); // isAuthenticatedUser , authorizedRoles("admin") ,
router.route('/products/create').post(createProduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getSingleProduct);

module.exports = router;