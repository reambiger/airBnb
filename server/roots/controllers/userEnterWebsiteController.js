const jwt = require("jsonwebtoken");
const { findMostVisitedDestination } = require("../../functions/utils");
const Country = require("../models/countryModel");
const Continent = require("../models/continentModel");
const City = require("../models/cityModel");
const Amenities = require("../models/amenitiesModel");
const Dictionaries = require("../models/dictionariesModel");

const { theGreatFilter } = require("../../functions/utils");

const secret = "secretkey";

exports.setNumberOfLogCookie = async (req, res, next) => {
  try {
    let visitCount = 1;

    if (req.cookies.lr) {
      const decoded = jwt.verify(req.cookies.lr, secret);

      visitCount = decoded.visitCount + 1;
    }
    req.visitCount = visitCount;

    const loggedRecentlyToken = jwt.sign({ visitCount: visitCount }, secret, {
      expiresIn: "30d",
    });

    res.cookie("lr", loggedRecentlyToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    next();
  } catch (error) {
    res.status(500).send({ status: "fail", message: error });
  }
};

exports.getDefaultCookies = async (req, res, next) => {
  try {
    if (req.cookies.ld) {
      const decodedDestination = jwt.verify(req.cookies.ld, secret);
      if (decodedDestination.destinationSearched) {
        const orderDestination = decodedDestination.destinationSearched.sort(
          (a, b) => b.count - a.count
        );
        const mostSearched = orderDestination[0].destination;
        req.query.destination = mostSearched;
      }
    }
    if (req.cookies.fm) {
      // const decodedFilterMethod = jwt.verify(req.cookies.fm, secret);
      // const { lowToHigh, review } = decodedFilterMethod.filterMethodCount;
      //  const favoriteFilterMethod= review >= lowToHigh ? "review" : "lowToHigh";
      //  req.query.filterMethod=favoriteFilterMethod
    }
    if (req.cookies.rn) {
      const decodedRoomNumber = jwt.verify(
        req.cookies.rn,
        secret
      ).PreferredRoomsNumberCount;

      PreferredRoomsNumberCount = decodedRoomNumber.reduce(
        (maxIndex, currentValue, currentIndex, arr) => {
          return currentValue > arr[maxIndex] ? currentIndex : maxIndex;
        },
        0
      );

      req.query.rooms = PreferredRoomsNumberCount;
    }
    if (req.cookies.pr) {
      const decodedPriceRange = jwt.verify(
        req.cookies.pr,
        secret
      ).priceRangeCount;
      const PreferredPriceRange = decodedPriceRange.sort(
        (a, b) => b.count - a.count
      )[0];

      const { priceRange } = PreferredPriceRange;
      req.query.priceRange = priceRange;
    }
    if (req.cookies.pa) {
      const amanitasPreference = [];
      const decodedAmenities = jwt.verify(
        req.cookies.pa,
        secret
      ).amenitiesCount;
      for (const [name, count] of Object.entries(decodedAmenities)) {
        if (count >= req.visitCount / 2) {
          amanitasPreference.push(name);
        }
      }
      req.query.amanitas = amanitasPreference;
    }

    next();
  } catch (error) {
    res
      .status(500)
      .send({ message: "internal server error", error: error.message });
  }
};
