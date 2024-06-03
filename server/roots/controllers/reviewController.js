const Review = require("../models/reviewModel");
const Apartment = require("../models/apartmentModel");

exports.createReview = async (req, res) => {
  try {
    console.log("🚀 ~ exports.createReview= ~ req:", req.params)
    
    const apartment = await Apartment.findById(req.params.apartmentId).populate(
      "reviews"
    );
    const CurrentReviews = apartment.reviews;
    const userInputReview = req.body.review;
    const updatedReviews = returnUpdatedReviews(
      CurrentReviews,
      userInputReview
    );
    
    apartment.reviews = updatedReviews;
    await apartment.save()

    res.status(200).send({ message: "reviews updated ",apartment:apartment });
  } catch (error) {
    res
      .status(500)
      .send({ message: "cant update reviews", error: error.message });
  }
};

const returnUpdatedReviews = (CurrentReviews, userInputReview) => {
  const {
    cleanliness,
    accuracy,
    communication,
    location,
    value,
    numOfReview,
  } = CurrentReviews;
  const compute = {
    cleanliness,
    accuracy,
    communication,
    location,
    value,
  };
  const result = {};
  const currentNumOfReview = numOfReview + 1;
  const previousNumOfReview = numOfReview;
  result.numOfReview = currentNumOfReview;
  for (const [reviewsType, grade] of Object.entries(compute)) {
    result[reviewsType] =
      userInputReview[reviewsType] / currentNumOfReview +
      grade / (currentNumOfReview / previousNumOfReview);
  }

  result.overall =
    Object.values(userInputReview).reduce((a, b) => a + b, 0) /
      currentNumOfReview +
    Object.values(result).reduce((a, b) => a + b, 0) /
      currentNumOfReview /
      (currentNumOfReview / previousNumOfReview);
  return result;
};
