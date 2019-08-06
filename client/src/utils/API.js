import axios from "axios";

export default {
    // logs in user
    login: function (loginInfo) {
        return axios.post("/api/users/login", loginInfo);
    },

    // signs up user, then logs them in
    signup: function (signupInfo) {
        return axios.post("/api/users/signup", signupInfo);
    },

    // checks to see if user is logged in, then returns the user
    isLoggedIn: function () {
        return axios.get("/api/users/profile");
    },


    // logs out the user
    logout: function () {
        return axios.get("/api/users/logout")
    }
};