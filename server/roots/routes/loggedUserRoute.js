const express = require("express");
const app = express();
const router = express.Router();
const userController = require("../controllers/userController");
const reviewController = require("../controllers/reviewController");
const recommendationController = require("../controllers/recommendationController");
const apartmentController = require("../controllers/apartmentController");




router.use(userController.authenticateUser)
router.post("/review/:apartmentId",reviewController.createReview)
router.post("/recommendation/:apartmentId",recommendationController.createRecommendation)
router.post("/bookApartment/:apartmentId",apartmentController.BookApartment)
// router.put()

module.exports = router;


// bookingapartment
//upload an apartment
