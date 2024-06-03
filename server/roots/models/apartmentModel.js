const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  imgs: {mainImg:{type: String},regularImgs:[{type: String}]  },
  address: { type: String, required: true },
  renting: {
    available: {
      rentingStartDate: { type: Date, },
      rentingEndDate: { type: Date, },
    },
    occupied: [
      {
        rentingStartDate: { type: Date, required: true },
        rentingEndDate: { type: Date, required: true },
        userRent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      },
    ],
  },
  priceForNight: { type: Number, required: true },
  amenities: { type: mongoose.Schema.Types.ObjectId, ref: "Amenities" },
  reviews: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },

  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
});

const Apartment = mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
