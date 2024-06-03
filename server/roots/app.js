const express = require("express");
const app = express();

const loggedUserRoute =require("./routes/loggedUserRoute")
const visitorRoute =require("./routes/visitorRoute")

app.use(express.json());
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cookieParser())

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));


app.use(visitorRoute)
app.use(loggedUserRoute)

module.exports = app;
