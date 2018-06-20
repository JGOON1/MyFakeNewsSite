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

app.get('/scrappedPage', (req, res) => {
    res.render("scrappedPage");
});

app.get('/savedArticles', (req, res) => {
    res.render("savedArticle");
});

app.get("/all", (req, res) => {
    db.article.find({})
        .then((dbarticle) => {
            res.json(dbarticle);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.get("/savedArticles/:id", (req, res) => {
    db.saved.findOne({ _id: req.params.id })
        .populate("Note")
        .then((savedNotes) => {
            console.log(savedNotes);
            res.json(savedNotes);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.post("/savedArticles/:id", (req, res) => {
    db.Notes.create(req.body)
        .then((dbNote) => {
            return db.article.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    note: dbNote._id
                },
                {
                    new: true
                }
            ).then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
        });
});

app.get("/saved", (req, res) => {
    db.saved.find({})
        .then((dbsaved) => {
            res.json(dbsaved);
        })
        .catch((err) => {
            res.json(err);
        })
})


app.post("/saved", (req, res) => {

    let result = {
        title: req.body.title,
        body: req.body.body
    };

    db.saved.create(result)
        .then((saved1) => {
            console.log(" ======================= 3 =======================");
            console.log(saved1);
            res.send(saved1);
        })
        .catch((err) => {
            return res.json(err);
        });
    console.log(' ======================== 1 ===============');
    console.log("bobdole");

});

app.get("/scrape", (req, res) => {
    axios.get("https://www.csmonitor.com/").then((response) => {
        const $ = cheerio.load(response.data);

        console.log(" ======================= 1 =======================");
        $("div.ezz-bottom>.ezp-ezflow_block>ul>li").each((i, element) => {
            console.log(" ======================= 2 =======================");
            let result = {};

            result.title = $(element).find("div.story_list_item").children("div.story_detail").find("h2.headline").text();

            result.body = $(element).find("div.story_detail").children("div.story_summary").children("p").text();

            result.url = $(element).find("div.story_detail").children("a").attr("href");

            result.img = $(element).find("div.story_list_item").children("div.story_thumbnail").children("a").children("figure").children("picture").children("source").attr("data-srcset");

            console.log(result);

            db.article.create(result)
                .then((Article) => {
                    console.log(" ======================= 3 =======================");
                    console.log(Article);
                    res.send(Article);
                })
                .catch((err) => {
                    console.log(" ======================= 4 =======================");
                    return res.json(err)
                });
        });
        console.log(" ======================= 5 =======================");

        res.send("Scrapped Complete!");
    });
});



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});