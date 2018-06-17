// Dependencies
const express = require("express"), bodyParser = require("body-parser"), logger = require("morgan"), mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

//Require all models
const db = require("./models");

// Requiring all models
const PORT = 3000;

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
mongoose.connect("mongodb://localhost/MyFakeNewsSite");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MyFakeNewsSite";

// // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// ROUTES
app.get('/', (req, res) => {
    res.render("landingPage");
});

app.get("/scrape", (req, res) => {
    axios.get("https://weather.com/weather/tenday/l/19006:4:US").then((response) => {
        const $ = cheerio.load(response.data);
        $("tr.clickable").each((i, element) => {
            let result = {};
            
            result.title = $(element).find("span.day-detail").text();
            result.body = $(element).find("td.description").attr("title");

            console.log(result);

            db.article.create(result)
                .then((Article) => {
                    console.log(Article);
                })
                .catch((err) => {
                    return res.json(err)
                }); 
        });

        res.send("Scrape Complete!");
    });
});



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});