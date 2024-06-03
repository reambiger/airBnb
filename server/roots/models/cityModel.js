const mongoose = require("mongoose");
const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
  
  },
  apartments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
    },
  ],
});

const City = mongoose.model("City", citySchema);

module.exports = City;
