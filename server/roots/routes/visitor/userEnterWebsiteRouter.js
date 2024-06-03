const express = require("express");
const app = express();
const router = express.Router();

const userEnterWebsiteController =require("../../controllers/userEnterWebsiteController")
const filterController =require("../../controllers/filterController")


router.use(userEnterWebsiteController.setNumberOfLogCookie)
router.use(userEnterWebsiteController.getDefaultCookies)
router.use(filterController.theGreatFilter)

module.exports = router;
