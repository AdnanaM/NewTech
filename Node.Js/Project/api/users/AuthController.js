let User = require("./UserModel");
const { promisify } = require("util");
let jwt = require("jsonwebtoken");
let config = require("../config");
let sendEmail = require("./Email");
const fs = require("fs");


exports.signup = function (req, res, next) {
  var newUser = new User(req.body);
  console.log("a" + newUser);
  newUser.created = new Date();
  newUser.modified = new Date();
  newUser
    .save()
    .then(function (user) {
      let token = jwt.sign({ id: user._id }, config.secrets.jwt, {
        expiresIn: config.expireTime,
      });
      res.status(201).json({
        status: "success",
        token,
        user: user,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: "fail",
        message: "error:😱" + err,
      });
    });
};

exports.login = function (req, res, next) {
  let { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("you need email and password");
    return;
  }
  User.findOne({ email: email }).then(function (user) {
    if (!user) {
      res.status(401).send("No user with the given username");
      return;
    } else {
      if (!user || !user.authenticate(password)) {
        res.status(401).send("Wrong password");
        return;
      } else {
        let token = signToken(user._id);
        res.status(200).json({
          status: "success",
          token: token,
        });
      }
    }
  });
};

let signToken = id => {
  return jwt.sign(
    {
      id: id,
    },
    config.secrets.jwt,
    {
      expiresIn: config.expireTime,
    }
  );
};

exports.protectSystem = async function (req, res, next) {
  //phase 1 - get token
  let token = "";
  arrAuthorization = req.headers.authorization.split(" ");
  if (arrAuthorization[0] == "Bearer" && arrAuthorization[1]) {
    token = arrAuthorization[1];
  }
  console.log(token);
  if (!token) {
    res.status(401).json({ fail: "You are not login again" });
    return;
  }

  //phase 2 - verification token
  let decoded = "";
  try {
    decoded = await promisify(jwt.verify)(token, config.secrets.jwt);
    console.log(decoded);
  } catch (err) {
    console.log(err);
    res.status(401).json({
      fail: "verification token failed please loginagain:" + err,
    });
    return;
  }

  // phase 3 check if user exist
  const currentUser = await User.findById(decoded.id);
  console.log(currentUser);
  if (!currentUser) {
    res.status(401).json({
      fail: "User not login please login again",
    });
    return;
  }

  //phase 4 - check if user changed passwords
  if (currentUser.changePasswordAfter(decoded.iat)) {
    res.status(401).json({
      fail: "User changed passwords, please login again",
    });
    return;
  }
  req.user = currentUser;
  next();
};

exports.isAdmin = function (req, res, next) {
  if (req.user && req.user.permission && req.user.permission == "admin") {
    next();
  } else {
    res.status(401).json({
      message: "you don’t have permission",
    });
  }
};

exports.forgotPassword = async function (req, res, next) {
  //phase 1 - get user by email
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    res.status(404).json({
      message: "please send email",
    });
    return;
  }
  try {
    //phase 2 - create random reset token
    let resetToken = user.createNewPasswordToken();
    await user.save({ validateBeforeSave: false });
    //phase 3 - send it to user email
    let resetUrl =
      req.protocol +
      ":/" +
      req.get("host") +
      "/api/v1/users/resetPassword/" +
      resetToken;
    let message = "click here to make new password " + resetUrl;

    await sendEmail({
      email: user.email,
      subject: "your password reset token ",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "token sent to your email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      status: "failed",
      message: "error sending email",
    });
  }
};

exports.resetPassword = async function (req, res, next) {
  //phase 1 - get user
  let user = await User.findOne({
    passwordResetToken: req.params.token,
    passwordResetExpires: { $gt: Date.now() },
  });
  //phase 2 - check if token not expired
  if (!user) {
    res.status(404).json({
      status: "failed",
      message: "invalid token",
    });
  }
  user.password = req.body.password;
  //phase 3
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  let token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token: token,
  });
};

exports.updatePassword = async function (req, res, next){
    //get user
    let user = await User.findById(req.user._id);
    //check current password
    if(!(await user.matchPassword(req.body.currentPassword)))   
    { 
        req.status(401).json({
            status:"failed",
            message:"password not correct"       
        })
        return   
    }
    //if the password correct update it
    user.password = req.body.password
    await user.save()
    //login user by sending jwt token
    let token = signToken(user._id)
    res.status(200).json({
        status:"success",
        token:token   
    });
};


exports.updateMe = async function(req, res, next){
  // create error if user post the password
  if(req.body.password){
    res.status(400).json({
      status:"failed",
      message:"can't update password from here"       
    });
    return   
  }
    //update user
  let filterBody = allowedObj(req.body, 'firstname', 'lastname','email');
  let user = await User.findByIdAndUpdate(req.user._id,filterBody, {new:true, runValidators:true});
  res.status(200).json({
    status:"success",
    user:user   
  });
};

let allowedObj = function(obj, ...allowedFields){ 
  let newobj = {}
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el))
    newobj[el] = obj[el]   
  });
  return newobj
};


exports.deleteMe = async function(req, res, next){
  //delete user
  let user = await User.findByIdAndUpdate(req.user._id,{active:false})
  res.json({
    status:"success",
    messagge:"user is no longer active"   
  });
};



