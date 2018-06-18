const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

//Using the schema constructor, create a new UserSchema object

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    img: {
        data: Buffer, 
        contentType: String
    }
});
// This creates our model from the above schema, using mongoose's model method
const article = mongoose.model("Article", ArticleSchema);
// Export the Article model
module.exports = article;