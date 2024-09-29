const mongoose = require('mongoose');

class Algorithm {
    id;
    pid;
    lang;
    solution;
    data;
    user;

    createMongooseObj(collection) {
        const algorithmSchema = mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            pid: mongoose.Schema.Types.ObjectId,
            lang: String,
            solution: String,
        }, { collection: collection });

        const Algorithm = mongoose.model('Algorithm', algorithmSchema, 'test');
    }
}

module.exports = Algorithm;