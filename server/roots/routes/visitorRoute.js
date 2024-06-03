const express = require("express");
const app = express();
const router = express.Router();
const userEnterWebsiteRoute =require("../routes/visitor/userEnterWebsiteRouter")
const userSearchedRoute =require("../routes/visitor/userSearchedRoute")
const userController = require("../controllers/userController");
const reviewController = require("../controllers/reviewController");
const apartmentController = require("../controllers/apartmentController");
const middlewareController=require("../controllers/middlewareController")


router.get("/userEnterWebsite",userEnterWebsiteRoute)
router.get('/search',userSearchedRoute)
router.post('/register',userController.registerUser)
router.get('/getApartment/:apartmentId',apartmentController.findApartmentById)
router.get('/logIn',userController.logInUser)
router.get('/retryUserPassword',userController.retryUserPassword)
router.get('/getLocation',userController.getUserLocation)


module.exports = router;
