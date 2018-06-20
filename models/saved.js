const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

//Using the schema constructor, create a new UserSchema object

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    img: {
        data: Buffer, 
        contentType: String
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});
// This creates our model from the above schema, using mongoose's model method
const saved = mongoose.model("Saved", NotesSchema);
// Export the Article model
module.exports = saved;