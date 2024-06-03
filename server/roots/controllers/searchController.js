const Continent = require("../models/continentModel");
const Country = require("../models/countryModel");
const City = require("../models/cityModel");
const Apartment = require("../models/apartmentModel");
const Amenities = require("../models/amenitiesModel");
const jwt = require("jsonwebtoken");
const { sanitizeInput } = require("../../functions/utils");
const secret = "secretkey";

exports.createDestinationCookie = async (req, res, next) => {
  try {
    let destinationSearched = [
      {
        destination: {
          name: req.query.destination.name,
          type: req.query.destination.type,
        },
        count: 1,
      },
    ];

    if (req.cookies.ld) {
      const decoded = jwt.verify(req.cookies.ld, secret);
      destinationSearched = decoded.destinationSearched;
      const index = destinationSearched.findIndex(
        (element) => element.destination.name === req.query.destination.name
      );
      index === -1
        ? destinationSearched.push({
            destination: req.query.destination,
            count: 1,
          })
        : (destinationSearched[index] = {
            destination: req.query.destination,
            count: destinationSearched[index].count + 1,
          });
    } else {
    }
    const destinationSearchedToken = jwt.sign(
      { destinationSearched: destinationSearched },
      secret,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("ld", destinationSearchedToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    next();
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
exports.getVisitsCookies = async (req, res, next) => {
  if (req.cookies.lr) {
    const decoded = jwt.verify(req.cookies.lr, secret);

    visitCount = decoded.visitCount;
  
  req.visitCount = visitCount;
  const visitCountToken = jwt.sign({ visitCount: visitCount }, secret, {
    expiresIn: "30d",
  });

  res.cookie("lr", visitCountToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  }
  next();
};
exports.createPreferredFilterMethodCookie = async (req, res, next) => {
  let filterMethodCount;
  try {
    if (req.query.filterMethod) {
      if (!req.cookies.fm) {
        filterMethodCount = { review: 0, lowToHigh: 0 };
      } else {
        const decoded = jwt.verify(req.cookies.fm, secret);
        filterMethodCount = decoded.filterMethodCount;
      }
      switch (req.query.filterMethod) {
        case "lowToHigh":
          filterMethodCount = {
            ...filterMethodCount,
            lowToHigh: filterMethodCount.lowToHigh + 1,
          };
          break;
        case "review":
          filterMethodCount = {
            ...filterMethodCount,
            review: filterMethodCount.review + 1,
          };

          break;

        default:
          break;
      }
    }
    const filterMethodToken = jwt.sign(
      { filterMethodCount: filterMethodCount },
      secret,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("fm", filterMethodToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {}

  next();
};
exports.createPreferredRoomsNumberCookie = async (req, res, next) => {
  let PreferredRoomsNumberCount;
  try {
    if (req.query.rooms) {
      const roomsNumber = Number(req.query.rooms);
      if (!req.cookies.rn) {
        PreferredRoomsNumberCount = new Array(11).fill(0);
      } else {
        const decoded = jwt.verify(req.cookies.rn, secret);
        PreferredRoomsNumberCount = decoded.PreferredRoomsNumberCount;
      }

      PreferredRoomsNumberCount[roomsNumber]++;
      const filterMethodToken = jwt.sign(
        { PreferredRoomsNumberCount: PreferredRoomsNumberCount },
        secret,
        {
          expiresIn: "30d",
        }
      );
    
      res.cookie("rn", filterMethodToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
  } catch (error) {}
  
  next();
};
exports.createPreferredPriceRangeCookie = async (req, res, next) => {
  try {
    let priceRangeCount;

    if (req.query.priceRange) {
      let { low, high } = req.query.priceRange;
      low = Number(low);
      high = Number(high);
      const thisPriceRange = { priceRange: { low: low, high: high }, count: 1 };
      if (!req.cookies.pr) {
        priceRangeCount = [thisPriceRange];
      } else {
        const decoded = jwt.verify(req.cookies.pr, secret);
        priceRangeCount = decoded.priceRangeCount;

        const index = priceRangeCount.findIndex(
          (range) =>
            range.priceRange.low === low && range.priceRange.high === high
        );

        if (index === -1) {
          priceRangeCount.push(thisPriceRange);
        } else {
          priceRangeCount[index] = {
            priceRange: thisPriceRange.priceRange,
            count: priceRangeCount[index].count + 1,
          };
        }
      }

      const priceRangeCountToken = jwt.sign(
        { priceRangeCount: priceRangeCount },
        secret,
        {
          expiresIn: "30d",
        }
      );

      res.cookie("pr", priceRangeCountToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
  } catch (error) {}
  next();
};

exports.createPreferredAmenitiesCookie = async (req, res, next) => {
  try {
    if (req.query.amenities) {
      let amenitiesCount;
      const amenities = req.query.amenities;
      const inputAmenities = amenities.map((amenity) => {
        return sanitizeInput(amenity);
      });
      req.query.amenities = inputAmenities;

      if (!req.cookies.pa) {
        amenitiesCount = {};
        inputAmenities.map((amenity) => (amenitiesCount[amenity] = 1));
      } else {
        const decode = jwt.verify(req.cookies.pa, secret);
        amenitiesCount = decode.amenitiesCount;
        inputAmenities.map((amenity) => {
          if (amenitiesCount[amenity]) {
            amenitiesCount[amenity]++;
          } else {
            amenitiesCount[amenity] = 1;
          }
        });
      }
     

      
      const amenitiesCountToken = jwt.sign(
        { amenitiesCount: amenitiesCount },
        secret,
        {
          expiresIn: "30d",
        }
      );

      res.cookie("pa", amenitiesCountToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    
    }
  } catch (error) {}
  next();
};
