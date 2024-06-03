const mongoose = require("mongoose");
const countrySchema = new mongoose.Schema({
  countryName: {
    type: String,
  
  },cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },]

});

const Country = mongoose.model("Country",countrySchema);

module.exports =Country ;
