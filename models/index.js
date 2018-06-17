// Exporting an object containing all of our models.  This must be done so that you don't have to require each file in the server.js file for requiring all the models

module.exports = {
    article: require("./article"),
    Notes: require("./notes")
};