const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v);
            },
            message: props => `${props.value} is not a valid password`
        },
        required: [true, "password is required"]
    },

    // very very similar to the 'notes' from the mongoose 19-Populate-Exercise
    // Remember that the ref property links these OjectIds to the RabUrl model
    // This allows us to populate the User with all associated RabUrl (Rabbit Urls)
    rabUrl: [{
        // Store OjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the RabUrl model
        ref: "RabUrl"
    }]
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.validPassword = function (password, encrypted) {
    return bcrypt.compareSync(password, encrypted);
}

const User = mongoose.model("User", userSchema);

module.exports = User;