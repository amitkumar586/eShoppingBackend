const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel');

exports.isAuthenticatedUser = async (req, res , next)=>{
    try {

        const {token }= req.cookies;
        // console.log(token);

        if(!token){
            return next( res.status(401).json({
                success:false,
                message:"Please login to access this resource"
            }));
        }

        const decodedData = jwt.verify(token , process.env.JWT_SECRET);
        req.user =  await userSchema.findById(decodedData._id);
        next();
        return req.user;

  
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"User fot found"
        });       
    }
}

exports.authorizedRoles = (...roles)=>{

    return (req , res , next) =>{

        if(!roles.includes(req.user.role)){
           return next(
            res.status(403).json({
                success:false,
                message:`Role : ${req.user.role} is not allow to access to this resource`
            })
           )
        }

        next();

     }; 

}