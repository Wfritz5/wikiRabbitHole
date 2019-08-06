import axios from "axios";

export default {

    // logs in user, need to pass parameters
    login: function (loginInfo) {
        return axios.post("/api/users/login", loginInfo);
    },

    isLoggedIn: function () {
        return axios.get("/api/users/profile");
    },

    // signs up user, then logs them in
    signup: function (signupInfo) {
        return axios.post("/api/users/signup", signupInfo);
    },

    // logs out the user
    logout: function () {
        return axios.get("/api/users/logout")
    },
    //*scrapes
    // scrape: function () {
    //     return axios.get("/api/scrape");
    // }
};