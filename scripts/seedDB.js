const mongoose = require('mongoose');
const db = require("../models");

mongoose.connect(
    // process.env.MONGODB_URI ||
    "mongodb://localhost/wikidatabase", {
        useNewUrlParser: true
    });

const raburlSeed = [{
        title: "Dagobah rules!",
        summary: "Global warming run amok",
        urlString: "https://en.wikipedia.org/wiki/Dagobah",
        image: "https://en.wikipedia.org/wiki/File:Dagobah.jpg",
        keyWords: ["yoda", "pandemic", "mountains"]
    },
    {
        title: "William Wallace",
        summary: "Dico tibi verum libertas optima rerum nunqual servili sub nexu vivito fili",
        urlString: "https://en.wikipedia.org/wiki/William_Wallace",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Wallace_Monument_20080505_Stained_glass_William_Wallace.jpg/220px-Wallace_Monument_20080505_Stained_glass_William_Wallace.jpg",
        keyWords: ["green", "Scotland", "Sterling Bridge"]
    },
    {
        title: "FFXV car on sale now",
        summary: "The Regalia can be yours",
        urlString: "https://en.wikipedia.org/wiki/Noctis_Lucis_Caelum",
        image: "http://vignette3.wikia.nocookie.net/finalfantasy/images/c/c9/FFXV_Regalia_Leviathan.jpg/revision/latest?cb=20160404171134",
        keyWords: ["Noctis", "Gladio", "Prompto", "Ignis"]
    }
];
const userSeed = [{
    username: "Will",
    password: "123",
}];

db.RabUrl
    .deleteMany({})
    .then(() => db.RabUrl.collection.insertMany(raburlSeed))
    // .then(data => {console.log(data.result)})
    .then(data => {
        console.log(data.result.n + " url records insterted!")
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

db.User
    .remove({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });