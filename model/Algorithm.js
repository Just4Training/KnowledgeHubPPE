const mongoose = require('mongoose');

const algorithmSchema = mongoose.Schema({
    pid: mongoose.Types.ObjectId,
    lang: String,
    solution: String,
    data: mongoose.Schema.Types.Mixed,
    user: mongoose.Types.ObjectId,
    location: String,
    date: Date
}, { collection: collection });

const Algorithm = mongoose.model('Algorithm', algorithmSchema, 'test');

module.exports = Algorithm;