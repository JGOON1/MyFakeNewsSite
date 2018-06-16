// Dependencies
const express = require("express"), bodyParser = require("body-parser"), logger = require("morgan"), mongoose = require("mongoose");

// Our scraping tools
const axios = require("axios"), cheerio = require("cheerio");

// Requiring all models
const db = require("./models"), PORT = 3000;

// Initializing Express
const app = express();

//Configure middleware
app.use(logger("dev"));
//Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//connect to the Mongo DB
// mongoose.connect("mongodb://localhost/MyFakeNewsSite");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//ROUTES
require("./routes/routes")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});