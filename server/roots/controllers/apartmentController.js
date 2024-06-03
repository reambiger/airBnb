const Apartment = require("../models/apartmentModel");
const { isFuture, isPast } = require("date-fns");
const jwt = require("jsonwebtoken");

secret = "secretkey";

const axios = require("axios");
const {
  isDateBetween,
  handleAvailabilityRangeForBooking,
  handleOccupationForBooking,
  convertAndCheckDate,
} = require("../../functions/utils");
const { isBefore } = require("date-fns");

exports.createApartment = async (req, res) => {
  try {
    const apartment = await Apartment.create(req.body.apartment);
    res.status(200).send({ message: "apartment created " });
  } catch (error) {
    res
      .status(500)
      .send({ message: "cant create apartment", error: error.message });
  }
};

exports.BookApartment = async (req, res) => {
  try {
    const apartmentId = req.params.apartmentId;
    const { startDate, endDate, payment } = req.body;
    const convertedStartDate = convertAndCheckDate(startDate);
    const convertedEndDate = convertAndCheckDate(endDate);
    if (
      !convertedEndDate ||
      !convertedStartDate ||
      isBefore(convertedEndDate, convertedStartDate)
    ) {
      res.status(400).send({ message: "invalid dates" });
      return;
    }
    const apartment = await Apartment.findById(apartmentId)
      .select("user address city renting imgs")
      .populate([
        {
          path: "user",
          select: "phoneNumber email fullName -_id",
        },
        {
          path: "city",
          select: "cityName -_id",
        },
      ]);
    const { occupied, available } = apartment.renting;
    if (
      !handleAvailabilityRangeForBooking(
        available,
        convertedStartDate,
        convertedEndDate
      ) ||
      !handleOccupationForBooking(
        convertedStartDate,
        convertedEndDate,
        occupied
      )
    ) {
      res.status(409).send({ message: "this dates are not available" });
      return;
    }
    if (!PaymentHandler(payment)) {
      res.status(400).send({ message: "invalid payment details" });
      return;
    }
    occupied.push({
      rentingStartDate: convertedStartDate,
      rentingEndDate: convertedEndDate,
    });
    apartment.renting.occupied = occupied;
    await apartment.save();
    const objectedApartment = apartment.toObject();
    delete objectedApartment.renting;
    objectedApartment.dates = {
      rentingStartDate: convertedStartDate,
      rentingEndDate: convertedEndDate,
    };
    res
      .status(200)
      .send({
        message: "apartment booked sucssfuly",
        apartment: objectedApartment,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// there is no payment logic implemented
const PaymentHandler = async (payment) => {
  if (payment) {
    return true;
  }
  return false;
};

exports.findApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.apartmentId)
      .select("-user")
      .populate([
        {
          path: "city",
          select: "cityName -_id",
        },
        {
          path: "reviews",
          select: "-_id",
          populate: {
            path: "recommendations",
            select: "-_id",
            populate: {
              path: "user",
              select: "fullName -_id",
            },
          },
        },
        { path: "amenities", select: "-_id" },
      ]);
    if (apartment) {
      res.status(200).send({ message: "success", apartment: apartment });
    } else {
      res.status(401).send({ message: "couldn't find apartment" });
    }
  } catch (error) {
    console.log("🚀 ~ exports.findApartmentById= ~ error:", error);
    res.status(500).send({ message: "internal server error" });
  }
};
