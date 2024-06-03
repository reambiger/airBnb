const Continent = require("../models/continentModel");
const Country = require("../models/countryModel");
const City = require("../models/cityModel");
const Amenities = require("../models/amenitiesModel");
const Apartment = require("../models/apartmentModel");
const {
  objectsDriller,
  returnGustsAllowed,
  isDateBetween,
  convertStringToDates,
  isApartmentAvailable,
  convertAndValidateDates,
} = require("../../functions/utils");
const { isBefore, isEqual, addDays } = require("date-fns");

exports.theGreatFilter = async (req, res) => {
  try {
    const {
      destination,
      filterMethod,
      amenities,
      rooms,
      priceRange,
      gusts,
      dates,
    } = req.query;
    let apartments = await relevantDestination(destination);

    const pricingRate = setPricingByVisits(req.visitCount);
    apartments = apartments.map((apartment) => {
      apartment.priceForNight = Math.round(
        apartment.priceForNight * pricingRate
      );
      return apartment;
    });

    if (filterMethod) {
      apartments =
        filterMethod === "lowToHigh"
          ? sortApartmentsFromLowToHigh(apartments)
          : await sortByReview(apartments);
    }
    if (amenities || rooms || gusts) {
      apartments = await sortByAmenities(apartments, amenities, rooms, gusts);
    }

    if (priceRange) {
      apartments = handlePriceRange(apartments, priceRange);
    }
    if (dates) {
      const { checkInRange, checkOutRange } = dates;
      console.log((checkInRange, checkOutRange));
      const { error, convertedCheckIn, convertedCheckOut } =
        convertAndValidateDates(checkInRange, checkOutRange);

      if (error) {
        res.status(422).send({ message: "unprocessable entity", error });
        return;
      }

      apartments = sortByDates(apartments, convertedCheckIn, convertedCheckOut);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedApartments = apartments.slice(startIndex, endIndex);

    const totalPages = Math.ceil(apartments.length / limit);

    res.status(200).send({
      status: "success",
      message: "relevant apartments",
      apartments: paginatedApartments,
      pagination: {
        totalPages,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        previousPage: page > 1 ? page - 1 : null,
      },
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

const relevantDestination = async (destinationSearched) => {
  if (!destinationSearched) {
    return await Apartment.find({}).populate([{ path: "city" }]);
  }

  const { type, name } = destinationSearched;
  let apartments = [];

  switch (type) {
    case "city":
      const city = await City.findOne({ cityName: name }).populate({
        path: "apartments",
        select: "imgs address priceForNight city amenities renting",
        populate: [
          {
            path: "city",
            select: "cityName -_id",
          },
          { path: "reviews", select: "overall -_id" },
        ],
      });
      apartments = city.apartments;
      break;

    case "country":
      const country = await Country.findOne({ countryName: name }).populate({
        path: "cities",
        populate: {
          path: "apartments",
          select: "imgs address priceForNight amenities renting",
          populate: [
            {
              path: "city",
              select: "cityName -_id",
            },
            { path: "reviews", select: "overall -_id" },
          ],
        },
      });
      country.cities.forEach((city) => {
        apartments = apartments.concat(city.apartments);
      });
      break;

    case "continent":
      const continent = await Continent.findOne({
        continentName: name,
      }).populate({
        path: "countries",
        populate: {
          path: "cities",
          populate: {
            path: "apartments",
            select: "imgs address priceForNight city amenities renting",
            populate: [
              {
                path: "city",
                select: "cityName -_id",
              },
              { path: "reviews", select: "overall -_id" },
            ],
          },
        },
      });
      continent.countries.forEach((country) => {
        country.cities.forEach((city) => {
          apartments = apartments.concat(city.apartments);
        });
      });
      break;
  }

  return apartments;
};

const setPricingByVisits = (visits) => {
  if (visits === 1 || visits === undefined) {
    return 1.1;
  }
  if (visits === 2) {
    return 1.2;
  }
  return 1.3;
};

const sortApartmentsFromLowToHigh = (apartments) => {
  apartments.sort((a, b) => a.priceForNight - b.priceForNight);
  const p = apartments.map((a) => a.priceForNight);
  return apartments;
};

const handlePriceRange = (apartments, priceRange) => {
  const { low, high } = priceRange;
  const inPriceRange = apartments.filter(
    (apartment) =>
      low < apartment.priceForNight && apartment.priceForNight < high
  );
  const outPriceRange = apartments.filter(
    (apartment) =>
      !(low < apartment.priceForNight && apartment.priceForNight < high)
  );
  const apartmentsInOrder = inPriceRange.concat(outPriceRange);
  return apartmentsInOrder;
};

const sortByReview = async (apartments) => {
  apartments.sort((a, b) => b.reviews.overall - a.reviews.overall);
  return apartments;
};

const sortByAmenities = async (apartments, amenities, rooms, gusts) => {
  let populatedApartments;
  populatedApartments = await Promise.all(
    apartments.map(async (condo) => {
      const populatedApartment = await condo.populate("amenities");
      const plainObject = populatedApartment.toObject();
      return plainObject;
    })
  );

  if (amenities) {
    populatedApartments.sort(
      (a, b) =>
        apartmentScore(b.amenities, amenities) -
        apartmentScore(a.amenities, amenities)
    );
  }
  if (rooms) {
    populatedApartments = sortByRooms(populatedApartments, rooms);
  }
  if (gusts) {
    populatedApartments = sortByGustsNum(populatedApartments, gusts);
  }
  return populatedApartments;
};

const apartmentScore = (apartment, amanitas) => {
  const obj2 = {};

  let counter = 0;
  const listOfAmenities = objectsDriller(apartment, obj2);
  amanitas.forEach((amenity) => {
    listOfAmenities[amenity] && counter++;
  });
  return counter;
};
const sortByRooms = async (apartments, rooms) => {
  const fit = apartments.filter(
    (apartment) => apartment.amenities.rooms.length == rooms
  );
  const unfit = apartments.filter(
    (apartment) => apartment.amenities.rooms.length != rooms
  );
  return fit.concat(unfit);
};

const sortByGustsNum = async (apartments, gusts) => {
  const fit = apartments.filter(
    (apartment) => returnGustsAllowed(apartment.amenities.rooms) == gusts
  );
  const unfit = apartments.filter(
    (apartment) => returnGustsAllowed(apartment.amenities.rooms) != gusts
  );
  return fit.concat(unfit);
};
const sortByDates = (apartments, checkInRange, checkOutRange) => {
  apartments.sort(
    (a, b) =>
      isApartmentAvailable(b.renting, checkInRange, checkOutRange) -
      isApartmentAvailable(a.renting, checkInRange, checkOutRange)
  );
  return apartments;
};
