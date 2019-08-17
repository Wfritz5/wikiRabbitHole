const mongoose = require('mongoose');
const db = require("../models");

mongoose.connect(
    // process.env.MONGODB_URI ||
    "mongodb://localhost/wikidatabase", {
        useNewUrlParser: true
    });


const userSeed = [
    {
     username: "bob",
    password: "1234Abcdef",
    rabUrl: []
    }   
];

const raburlSeed = [{
        title: "Dagobah rules!",
        summary: "Global warming run amok",
        urlString: "https://en.wikipedia.org/wiki/Dagobah",
        image: "https://en.wikipedia.org/wiki/File:Dagobah.jpg",
        keyWords: ["yoda", "pandemic", "mountains", "Ignis"]
    },
    {
        title: "William Wallace",
        summary: "Dico tibi verum libertas optima rerum nunqual servili sub nexu vivito fili",
        urlString: "https://en.wikipedia.org/wiki/William_Wallace",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Wallace_Monument_20080505_Stained_glass_William_Wallace.jpg/220px-Wallace_Monument_20080505_Stained_glass_William_Wallace.jpg",
        userId: null,
        keyWords: ["green", "Scotland", "Sterling Bridge"]
    },
    {
        title: "FFXV car on sale now",
        summary: "The Regalia can be yours",
        urlString: "https://en.wikipedia.org/wiki/Noctis_Lucis_Caelum",
        image: "http://vignette3.wikia.nocookie.net/finalfantasy/images/c/c9/FFXV_Regalia_Leviathan.jpg/revision/latest?cb=20160404171134",
        userId: null,
        keyWords: ["Noctis", "Gladio", "Prompto", "Ignis"]
    }
];
var insertedIds = {};
//var insertedCount = 0;

insertUser = function(idObj) {
    db.User
    .deleteMany({})
    .then(() => {userSeed[0].rabUrl.push(idObj[0]);
        userSeed[0].rabUrl.push(idObj[1]);
        userSeed[0].rabUrl.push(idObj[2]);
    })
    .then( () => db.User.collection.insertMany(userSeed))
    .then(userData => {
        console.log("ObjId of user: ", userData.ops[0]._id);
        console.log("rabUrl first obj: ", idObj[0]);
        idObj[0].userId = userData.ops[0]._id;
        idObj[1].userId = userData.ops[0]._id;
        idObj[2].userId = userData.ops[0]._id;
        console.log(userData.result.n + " records inserted!");
        console.log(userData);
    })
    // .then( () =>  {
    //     console.log( "idObj[0]._id: ", idObj[0]._id);
    //     console.log( "idObj[1]._id: ", idObj[1]._id);
    //     console.log( "idObj[2]._id: ", idObj[2]._id);
    //     console.log("userId to insert there: ", idObj[0].userId)
    //     const filter = { _id: idObj[0]._id };
    //     const theUpdate = { userId: idObj[0].userId };
    //     console.log('the update', theUpdate)
    //     // db.RabUrl.findByIdAndUpdate(idObj[0]._id, { $set: theUpdate})
    //     db.RabUrl.findByIdAndUpdate(idObj[0]._id, { $set: {userId: idObj[0].userId}})
    //     .then(data => {
    //         console.log('it worded', data);
    //     }).catch(err =>{
    //         console.error('error', err);
    //     })  
    //     console.log('passes the findoneandupdate')      
    // })
    .then(() => db.RabUrl.findByIdAndUpdate(idObj[0]._id, { $set: {userId: idObj[0].userId}}))
    .then( (data) =>  {
        console.log('data', data) })
        // const filter = { _id: idObj[1]._id };
        // const update = { userId: idObj[1].userId };
        // db.RabUrl.findByIdAndUpdate(idObj[1]._id, update)
        // .catch(err =>{
        //     console.error(err);
        //     process.exit(1);
        //     })        ;
    .then(() => db.RabUrl.findByIdAndUpdate(idObj[1]._id, { $set: {userId: idObj[0].userId}}))
    .then( (data) =>  { console.log('data', data) })
    .then(() =>  db.RabUrl.findByIdAndUpdate(idObj[2]._id, { $set: {userId: idObj[0].userId}}))
       /*  {
        const filter = { "_id": idObj[2]._id };
        const update = { "userId": idObj[2].userId };
        db.RabUrl.collection.findOneAndUpdate(filter, update)
        .catch(err =>{
            console.error(err);
            process.exit(1);
            })        ; */
        //process.exit(0);
        .then( (data) =>  {
            console.log('data', data) ;
            process.exit(0);
        })
    
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
}


db.RabUrl
        .deleteMany({})
        .then(() => 
            db.RabUrl.collection.insertMany(raburlSeed))
        //.then(data => {console.log(data)})
        .then(data => {
                    //console.log(data);
            //        console.log(data.result.n + " url records insterted!");
                    insertedIds = data.insertedIds;
                    //insertedCount = data.insertedCount;
                    for (let idx = 0; idx < data.insertedCount; idx++){
                        console.log(data.insertedIds[idx]);
                    }
                    //console.log(data.insertedIds);
                    insertUser(data.insertedIds);
                })
            
        .catch(err => {
            console.error(err);
            process.exit(1);
        })


//foo();
//console.log(Object.values(insertedIds));
// console.log (insertedIds[0]);
// db.User
//     .remove({})
//     .then(() => db.User.collection.insertMany(userSeed))
//     .then(data => {
//         console.log(data.result.n + " records inserted!");
//         process.exit(0);
//     })
//     .catch(err => {
//         console.error(err);
//         process.exit(1);
//     });
