const validator = require('validator');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const res = require('express/lib/response');

const userSchema = new mongoose.Schema({

    name: {

        type: String,
        required: [true, "Please enter your name"],
        maxlength: [35, "Name can not exceed 30 characters"],
        minlength: [4, " Name Should Have More then 4 Characters"],
        trim: true
    },

    email: {

        type: String,
        trim: true,
        required: [true, "Please enter your email"],
        maxlength: [35, "Name can not exceed 35 characters"],
        minlength: [4, " Name Should Have More then 4 Characters"],
        unique: true,
        validate: [validator.isEmail, "Plase enter a valid email"],
        lowercase: true

    },

    phone: {

        type: Number,
        unique: true,
        required: [true, "Please enter your phone"],
        minlength: [12, "Length should be 10 numbers "]
    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
        select:false
    },

    role: {
        type: String,
        default: "user"
    },

    address: {
        type: String,
        required: [true, "Please enter your address"],
        // minlength: [10, "Length should be more then 10 characters"],
        maxlength: [150, "Name can not exceed 150 characters"]
    },

    profileImage: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
},
 { timestamps: true }
);

// bcrypt password
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcryptjs.hash(this.password , 10);
});



// jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE});
}

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){

    return await bcryptjs.compare(enteredPassword , this.password );
}


// generatinfg reset password token
userSchema.methods.getResetPasswordToken =function(){

    // generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and add to userSchema
    this.resetPasswordToken =crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 *1000;

    return resetToken;
};


const User = new mongoose.model('USER', userSchema);

module.exports = User; 