const bodyParser = require("body-parser");
const app = require("./app");
const port = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { addMissingPhone } = require("../functions/dataBaseBuilder");
dotenv.config({ path: "../.env" });
mongoose
  .connect(process.env.MONGOURL, {
    connectTimeoutMS: 10000000,
    socketTimeoutMS: 10000000,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});

