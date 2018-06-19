const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SavedSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    url: {
        type: String
    },
    img: {
        data: Buffer
    }
});

const saved = mongoose.model("Saved", SavedSchema);

module.exports = saved;