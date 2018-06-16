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

//connect to the Mongo DB
mongoose.connect("mongodb://localhost/MyFakeNewsSite");

