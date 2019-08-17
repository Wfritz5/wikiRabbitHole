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
    scrape: function (url, linkCount) {
        return axios.get(`/api/scrape/${url}/${linkCount}`);
    },

    addUrl: function (userId) {
        return axios.post(`/api/rabUrl/${userId}`)
    },

    getUrl: function (id) {
        return axios.get(`/api/rabUrl/${id}`)
    },

    updateUrl: function (id) {
        return axios.put(`/api/rabUrl/${id}`)
    },

    deleteUrl: function (id) {
        return axios.delete(`/api/rabUrl/${id}`)
    },
    findUrlByKeyWord: function (word) {
        return axios.get(`/api/rabUrl/keyWord/${word}`)
    },
    findUrlBySingleUserKeyWord: function (userId, word) {
        return axios.get(`/api/rabUrl/keyWord/${userId}/${word}`)
    },
    getUserByName: function (name){
        return axios.get(`/api/users/username/${name}`)
    },
    getUserById: function (id){
        return axios.get(`/api/users/${id}`)
    },
    updateUserById: function (id) {
        return axios.put(`/api/users/${id}`)
    },
    deleteUserById: function (id) {
        return axios.delete(`/api/users/${id}`)
    }
};