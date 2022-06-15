const express = require('express');
const { registerUser , loginUser, logout, forgotPassword, getUserDetails, getAllUsers, getSingleUserDetails } = require('../controller/userController');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/user/register').post(registerUser);
router.route('/user/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/user/logout').get(logout);

router.route('/user/details').get(isAuthenticatedUser, getUserDetails);   //isAuthenticatedUser ,

router.route('/admin/users').get( isAuthenticatedUser,authorizedRoles("admin") , getAllUsers);

router.route('/admin/users/:id').get(isAuthenticatedUser,authorizedRoles("admin") , getSingleUserDetails);

module.exports = router;
