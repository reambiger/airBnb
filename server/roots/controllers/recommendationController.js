const Recommendation = require("../models/recommendationModel");
const Apartment = require("../models/apartmentModel");

exports.createRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.create(req.body.recommendation);
    console.log(
      "🚀 ~ exports.createRecommendation= ~ recommendation:",
      recommendation
    );
    const apartment = await Apartment.findById(req.params.apartmentId).populate(
      "reviews"
    );
    apartment.reviews.recommendations.unshift(recommendation._id);
    await apartment.save();

    res
      .status(200)
      .send({ message: "recommendation created ", apartment: apartment });
  } catch (error) {
    res
      .status(500)
      .send({ message: "cant create recommendation", error: error.message });
  }
};
