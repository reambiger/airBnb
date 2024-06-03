const Apartment = require("../roots/models/apartmentModel");
const City = require("../roots/models/cityModel");
const User = require("../roots/models/userModel");
const Continent = require("../roots/models/continentModel");
const Amenities = require("../roots/models/amenitiesModel");
const Country = require("../roots/models/countryModel");
const Review = require("../roots/models/reviewModel");
const Recommendation = require("../roots/models/recommendationModel");
const { global } = require("../data");
const { faker } = require("@faker-js/faker");
const { format, addDays, addMonths, addWeeks } = require("date-fns");
const { generateRandomBooleanValues, randomInt } = require("./utils");
const { createClient } = require("pexels");
const { v2 } = require("cloudinary");
require("dotenv").config();

const createDB = async () => {
  await generateContinent();
};

const generateContinent = async () => {
  for (const [continent, countrysArray] of Object.entries(global)) {
    const newCountry = await generateCountry(countrysArray);
    const newContinent = await Continent.create({
      continentName: continent,
      countries: newCountry,
    });
  }
  console.log("success");
};

const generateCountry = async (countrysArray) => {
  const newCountries = [];

  for (const [country, citiesArray] of Object.entries(countrysArray)) {
    let citiesOfCountry = await generateCity(citiesArray);
    const newCountry = await Country.create({
      countryName: country,
      cities: citiesOfCountry,
    });
    newCountries.push(newCountry);
  }
  return newCountries;
};
const generateCity = async (citiesArray) => {
  const apartmentNum = 12;
  const newCities = [];
  for (let index = 0; index < citiesArray.length; index++) {
    const cityName = citiesArray[index];
    const generatedApartments = await generateApartment(apartmentNum);
    const newCity = await City.create({
      cityName: cityName,
      apartments: generatedApartments,
    });
    generatedApartments.map((apartment) => {
      apartment.city = newCity._id;
      apartment.save();
    });
    newCities.push(newCity);
  }
  return newCities;
};

const generateApartment = async (apartmentNum) => {
  const apartments = [];
  for (let i = 0; i < apartmentNum; i++) {
    const generatedUser = await generateUser(1);

    const address = faker.location.streetAddress();
    const reviews = await generatedReviews();
    const renting = await generateRandomRent(reviews.recommendations[0]);
    const amenities = await generatedAmenities();
    const priceForNight = randomInt(200, 1000);
    const data = {
      address,
      renting,
      priceForNight,
      reviews,
      amenities,
      user: generatedUser._id,
    };
    const createdApartment = await Apartment.create(data);
    generatedUser.apartments = [createdApartment._id];
    generatedUser.save();

    apartments.push(createdApartment);
  }
  return apartments;
};
const generateUser = async (usersNum) => {
  for (let index = 0; index < usersNum; index++) {
    const generatedUser = await User.create({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    return generatedUser;
  }
};

const generateRandomRent = async (recommendationId) => {
  const recommendation = await Recommendation.findById(recommendationId);
  const user = recommendation.user;
  const initialRandomDate = faker.date.soon();
  const occupiedStartDate = addWeeks(initialRandomDate, randomInt(1, 3));
  const obj = {
    available: {
      rentingStartDate: initialRandomDate,
      rentingEndDate: addMonths(initialRandomDate, randomInt(1, 10)),
    },
    occupied: [
      {
        rentingStartDate: occupiedStartDate,
        rentingEndDate: addDays(occupiedStartDate, randomInt(2, 5)),
        userRent: user,
      },
    ],
  };
  return obj;
};

const addRent = async () => {
  const apartments = await Apartment.find({});
  const users = User.find({});
  Promise.all(
    apartments.map(async (apartment, i) => {
      const initialRandomDate = faker.date.soon();
      const occupiedStartDate = addWeeks(initialRandomDate, randomInt(1, 3));
      apartment.renting.available.rentingStartDate = initialRandomDate;
      apartment.renting.available.rentingEndDate = addMonths(
        initialRandomDate,
        randomInt(1, 10)
      );
      apartment.renting.occupied = [
        {
          rentingStartDate: occupiedStartDate,
          rentingEndDate: addDays(occupiedStartDate, randomInt(2, 5)),
          userRent: users[i],
        },
      ];
      await apartment.save();
    })
  );
};

const generatedAmenities = async () => {
  const createdAmenity = await Amenities.create(generateRandomBooleanValues());
  return createdAmenity;
};

const generatedReviews = async () => {
  const data = {
    cleanliness: randomInt(3, 5),
    accuracy: randomInt(3, 5),
    communication: randomInt(3, 5),
    location: randomInt(3, 5),
    value: randomInt(3, 5),
  };
  data.overall = Object.values(data).reduce((total, num) => total + num, 0) / 5;
  data.recommendations = await generateRecommendation();

  const createdReviews = await Review.create(data);
  return createdReviews;
};

const generateRecommendation = async () => {
  const recommendations = [];

  for (let index = 0; index < 4; index++) {
    const createdUser = await generateUser(1);
    const createdRecommendation = await Recommendation.create({
      user: createdUser,
      recommendationDate: faker.date.past(),
      text: faker.lorem.paragraph({ min: 3, max: 6 }),
      overAllStars: 3 + Math.random() * 2,
    });

    recommendations.push(createdRecommendation);
  }

  return recommendations;
};

const AddImagesToApartments = async () => {
  try {
    const apartments = await Apartment.find({
      "imgs.mainImg": { $exists: false },
      priceForNight: { $gt: 600 },
    });

    const photoList = await generateImages("pool house", apartments.length);
    for (let index = 0; index < photoList.length; index++) {
      const response = await uploadImages(photoList[index], index);
      const apartment = apartments[index];
      apartment.imgs.mainImg = response.url;
      await apartment.save();
    }
  } catch (error) {
    console.error("Error processing apartments:", error);
  }
};

const AddSecondaryImagesToApartments = async () => {
  // const photoLivingRoomList = await generateImages("living room", 100);
  const photoBalconyList = await generateImages("balcony", 100);
  const photoBedroomList = await generateImages("bedroom", 100);
  const photoKitchenList = await generateImages("Kitchen", 100);
  const apartments = await Apartment.find({ "imgs.regularImgs": { $size: 1 } });

  for (let index = 0; index < apartments.length; index++) {
    const apartment = apartments[index];

    // const responseLivingRoom = await uploadImages(photoLivingRoomList[index],"LivingRoom",index);
    const responseBedRoom = await uploadImages(
      photoBedroomList[index],
      "bedRoom",
      index
    );
    const responseBalcony = await uploadImages(
      photoBalconyList[index],
      "Balcony",
      index
    );
    const responseKitchen = await uploadImages(
      photoKitchenList[index],
      "Kitchen",
      index
    );

    // apartment.imgs.regularImgs[0]=responseLivingRoom.url

    apartment.imgs.regularImgs[1] = responseBedRoom.url;
    apartment.imgs.regularImgs[2] = responseBalcony.url;
    apartment.imgs.regularImgs[3] = responseKitchen.url;
    await apartment.save();
  }
  console.log("done");
};

const generateImages = async (query, num) => {
  try {
    const client = createClient(process.env.PEXELS_SECRET_KEY);
    const photoList = await client.photos.search({ query, per_page: num });
    return photoList.photos;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

const uploadImages = async (photo, name, index) => {
  try {
    const imgId = photo.id;
    const response = await v2.uploader.upload(
      `https://images.pexels.com/photos/${imgId}/pexels-photo-${imgId}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
      { public_id: `${name}-${index + 750}` }
    );
    return response;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
const addNumReviews = async () => {
  try {
    const apartments = await Apartment.find({}).populate("reviews");
    for (const apartment of apartments) {
      const randomNumOfReview = randomInt(20, 100);
      const review = apartment.reviews;
      review.numOfReview = randomNumOfReview;
      await review.save();
    }
  } catch (error) {
    console.error("Error updating number of reviews:", error);
  }
};

const addMissingPhone = async () => {
  try {
    const users = await User.find({});

    await Promise.all(users.map(async (user) => {
      if (!user.phoneNumber) {
        user.phoneNumber = faker.phone.number()
                await user.save();
      }
    }));
    
    console.log('Missing phones added successfully.');
  } catch (error) {
    console.error('Error while adding missing phones:', error);
  }
};

module.exports = {
  createDB,
  generateCity,
  generateApartment,
  generateUser,
  generatedAmenities,
  generateImages,
  AddImagesToApartments,
  generateRandomRent,
  AddSecondaryImagesToApartments,
  addNumReviews,
  addRent,
  addMissingPhone
};
