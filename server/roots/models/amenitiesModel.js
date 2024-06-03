const mongoose = require("mongoose");

const amenitiesSchema = new mongoose.Schema({
  rooms: [
    {
      beds: [
        {
          isKingSize: { type: Boolean },
        },
      ],
    },
  ],
  bathroom: {
    bathtub: { type: Boolean },
    hairdryer: { type: Boolean },
    cleaningProducts: { type: Boolean },
    hotWater: { type: Boolean },
  },
  laundry: {
    washer: { type: Boolean },
    essentials: { type: Boolean },
    hangers: { type: Boolean },
    iron: { type: Boolean },
    dryingRack: { type: Boolean },
  },
  entertainment: {
    tv: { type: Boolean },
    hotTub: { type: Boolean },
    pingPong: { type: Boolean },
    snooker: { type: Boolean },
  },
  family: {
    crib: { type: Boolean },
    highChair: { type: Boolean },
  },
  internetAndOffice: {
    wifi: { type: Boolean },
    dedicatedWorkspace: { type: Boolean },
  },
  kitchenAndDining: {
    kitchen: { type: Boolean },
    refrigerator: { type: Boolean },
    microwave: { type: Boolean },
    dishes: { type: Boolean },
    gasStove: { type: Boolean },
    oven: { type: Boolean },
    coffeeMaker: { type: Boolean },
    diningTable: { type: Boolean },
  },
  parkingAndFacilities: {
    elevator: { type: Boolean },
    parking: { type: Boolean },
  },
});

const Amenities = mongoose.model("Amenities", amenitiesSchema);

module.exports = Amenities;
