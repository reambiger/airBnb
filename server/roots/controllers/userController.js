const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/userModel");
secret = "secretkey";
const axios = require("axios");
exports.registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).send({
        message: "email already exists suggest him to restore his password",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUser._id }, secret, {
      expiresIn: "1h",
    });
    res.cookie("ui", token, {
      httpOnly: true,
      maxAge: 60000,
      sameSite: "strict",
    });
    res.status(200).send({ message: "user created sucssfuly" });
  } catch (err) {
    res.status(400).send({
      status: "fail to create user ",
      message: err,
    });
  }
};

exports.logInUser = async (req, res, next) => {
  try {
    const { email, password } = req.query;
    console.log("🚀 ~ exports.logInUser= ~ email, password :", email, password);
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    } else {
      const token = jwt.sign({ userId: user._id }, secret, {
        expiresIn: "1h",
      });
      res.cookie("ui", token, {
        httpOnly: true,
        maxAge: 60000,
        sameSite: "strict",
      });
      const { fullName, apartments } = user;
      const detailsAloudInTheFrontEnd = { fullName, apartments };

      res.status(200).send({
        message: "Logged in successfully",
        user: detailsAloudInTheFrontEnd,
      });
    }
  } catch (err) {
    res.status(400).send({
      status: "fail",
      message: "An error occurred during login",
    });
  }
};

exports.authenticateUser = async (req, res, next) => {
  try {
    if (!res.cookies.ui) {
      res.status(401).send({ status: "fail", message: "no token provided" });
    } else {
      const decodedId = jwt.verify(res.cookies.ui, secret).userId;
      const userData = await User.findOne({ _id: decodedId });
      next();
    }
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.getUserLocation = async (req, res) => {
  try {
    let address ,data
    let  addressComponents
    const { latitude, longitude } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${Number(latitude)},${Number(longitude)}&key=AIzaSyCTyWB7Wn929yKzLRg41Pg28krZ-t87Ofw&language=en`
    );
    if (response.status === 200) {
       data = response.data;
      if (data.status === "OK") {
        addressComponents = data.results[0].address_components;
        address=arrangeMyAddress(addressComponents)
        
        address.city = addressComponents[2]?.long_name;
        address.district = addressComponents[4]?.long_name;
        address.country = addressComponents[6]?.long_name;
        address.street = addressComponents[1]?.long_name;
        address.streetNumber = addressComponents[0]?.long_name;
      } else {
        throw new Error("Failed to fetch address");
      }
    } else {
      throw new Error("Failed to fetch address");
    }
    res.status(200).send({ massage: "success", address: address });
  } catch (error) {
    console.error("Error getting user address:", error);
    res.status(500).send({ massage: "fail", error: error });
  }
};
exports.retryUserPassword = async (req, res, next) => {};


const arrangeMyAddress=(addressComponents)=>{
  const address={}
for (let i = 0; i < addressComponents.length; i++) {
   address[addressComponents[i].types[0]]=addressComponents[i].long_name
  
}
return address
}
//irrelevant in this website type
// const suggestADifferentName = async (fullName) => {
//   let num = 1;
//   let suggestedUsername;

//   while (true) {
//     suggestedUsername = fullName + String(num);
//     const nameSuggestionExists = await User.exists({
//       fullName: suggestedUsername,
//     });

//     if (!nameSuggestionExists) {
//       return suggestedUsername;
//     }

//     num++;
//   }
// };
