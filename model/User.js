const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean,
}, { collection: 'test'});

const User = mongoose.model('User', userSchema, 'test');

module.exports = User;