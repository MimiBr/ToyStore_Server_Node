const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, minLength: 2, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('user', userSchema);
