
const express = require("express");
const app = express();
const router = express.Router();

const searchController = require("../../controllers/searchController");
const filterController = require("../../controllers/filterController");

router.use(searchController.getVisitsCookies);
router.use(searchController.createDestinationCookie);
router.use(searchController.createPreferredFilterMethodCookie);
router.use(searchController.createPreferredRoomsNumberCookie);
router.use(searchController.createPreferredPriceRangeCookie);
router.use(searchController.createPreferredAmenitiesCookie);
router.use(filterController.theGreatFilter);

module.exports = router;
