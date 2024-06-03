const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
   user:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
   recommendationDate:{type:Date},
   text:{type:String},
   overAllStars:{type:Number},
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

module.exports = Recommendation;
