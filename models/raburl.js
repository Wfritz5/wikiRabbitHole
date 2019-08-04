var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new RabUrl object
// This is similar to a Sequelize model
// Please note that I am NOT making this unique in any way, but
// the system assigned id.   This allows for the keywords associated
// with this urlString to be customized per user.
// The ramification of this is that when a user gets deleted, ALL of that
// user's RabUrls must get deleted or they will be orphaned.
var RabUrlSchema = new Schema ({
    urlString: String,
    keyWords: []
});

//This creates the model from the abive schema, using mongoose's model method
var RabUrl = mongoose.model("RabUrl", RabUrlSchema);

// Export the RabUrl model...so somebody can use it
module.exports = RabUrl;