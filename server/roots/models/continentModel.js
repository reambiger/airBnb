const mongoose = require("mongoose");
const continentSchema = new mongoose.Schema({
  continentName: {
    type: String,
  
  },countries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },]
});

const Continent = mongoose.model("Continent", continentSchema);

module.exports = Continent;
