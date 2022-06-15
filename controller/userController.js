const userSchema = require("../models/userModel");
const sendEmail= require('../utils/sendEmail');
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const cookie = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dlaaa",
  api_key: "773536879572886",
  api_secret: "blNnGTmJ3uQnKS2ChLmIeVsLuks",
  secure: true,
});

// exports.addProfile = async (req, res, next) => {

//   const file = await req.files.profileImage;
//   cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
//     console.log(result);

//     ///////////////////

//     const profile =  userSchema({

//       profileImage:result.url
//     });

//     profile.save()
//       .then((result) => {
//         res.status(201).json({
//           success: true,
//           profile,
//         });
//       })
//       .catch((err) => {
//         res.status(201).json({
//           success: false,
//           error: err,
//         });
//       });
//     ///////////////////
//   });
// };

// registration employee
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, address, profileImage } = req.body;

    const user = await userSchema.create({
      name,
      email,
      phone,
      password,
      address,
      profileImage,
    });

    sendToken(user, 201, res);

    // const token = await user.getJwtToken();

    // res.status(201).json({
    //   success: true,
    //   user,
    //   token,
    // });
  } catch (error) {
    console.log(error);
  }
};

//login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        res.status(400).json({
          success: false,
          message: "Please Enter Email & Password",
        })
      );
    }

    const user = await userSchema.findOne({ email: email }).select("+password");

    if (!user) {
      return next(
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        })
      );
    }

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(
        res.status(401).json({
          success: false,
          message: "Invalid credentials",
        })
      );
    }

    sendToken(user, 200, res);

    // const token = await user.getJwtToken();

    // res.status(200).json({
    //   success: true,
    //   token,
    // });
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid User" });
  }
};

// Logout user
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      error: error,
    });
  }
};


// forgot Password
exports.forgotPassword = async (req , res , next)=>{
  try{
    const user  = user.findOne({email:req.body.email});

    if(!user){
      return next(res.status(404).json({
        message:"User not found"
      }));
    }

    //get reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});


    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n${resetPasswordUrl}\n\n ifyou have not requested this email then please ignore it `;

    try {

      await sendEmail({
        email:user.email,
        subject: `eShopping password Recovery`,
        message
      });

      req.status(200).json({
        success:true,
        messag:`Email sent to ${user.email} successfully`,
      })
      
    } catch (error) {
     user.resetPasswordToken = undefined;
     user.resetPasswordExpire =undefined;
     await user.save({validateBeforeSave:false}); 

     return next(res.status(500).json({
       error: error.message
     }));
      
    }

  }catch(error){console.log(error)}
}

// get user details
exports.getUserDetails = async(req , res , next)=>{

try {

const user = await userSchema.findById(req.user.id);

res.status(200).json({
  success:true,
  user
});    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:"Internal server error"
    })
    
  }
}

// get all users - admin
exports.getAllUsers = async(req , res , next)=>{

  try {
  
  const users = await userSchema.find();
  res.status(200).json({
    success:true,
    users
  })
      
    } catch (error) {
      res.status(500).json({
        success:false,
        message:"Internal server error"
      })
      
    }
  }


// get single user details
exports.getSingleUserDetails = async(req , res , next)=>{

  try {
  
  const user = await userSchema.findById(req.params.id);

  if(!user){
    return next(res.status(401).json({
      success:false,
      message:`User does not exist with id: ${req.params.id}`
    }));
  }
  
  res.status(200).json({
    success:true,
    user
  });    
    } catch (error) {
      res.status(500).json({
        success:false,
        message:"Internal server error"
      })
      
    }
  }

