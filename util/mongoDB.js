const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/';

async function connectMongo(db) {
    url = url.concat(db);
    try {
        await mongoose.connect(url);
        console.log(`${db} connected.`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connectMongo };