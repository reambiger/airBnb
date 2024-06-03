const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  apartments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
    },
  ],
  email: { type: String },
  password: { type: String },
  phoneNumber:{type:String}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
