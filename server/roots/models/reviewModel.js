const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  overall: { type: Number },
  cleanliness: { type: Number },
  accuracy: { type: Number },
  communication: { type: Number },
  location: { type: Number },
  value: { type: Number },
  numOfReview:{type:Number},
  recommendations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Recommendation" },
  ],
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
