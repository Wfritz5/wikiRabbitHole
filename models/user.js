const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    // very very similar to the 'notes' from the mongoose 19-Populate-Exercise
    // Remember that the ref property links these OjectIds to the RabUrl model
    // This allows us to populate the User with all associated RabUrl (Rabbit Urls)
    rabUrl: [
        {
            // Store OjectIds in the array
            type: Schema.Types.ObjectId,
            // The ObjectIds will refer to the ids in the RabUrl model
            ref: "RabUrl"
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;