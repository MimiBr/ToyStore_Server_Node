const mongoose = require("mongoose");
const Category=require("./categoryModel")

const toySchema = mongoose.Schema({
    name: { type: String, minLength: 3 },
    prodDate: { type: Date, default: Date.now },
    numberOfPlayers: { type: Number, min: 1 },
    agePlayer: { type: [Number] },
    price: { type: Number, min: 1, max: 3000 },
    company: { type: String, match: /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z0-9]+$/ },
    targets: { type: [String] },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Toy', toySchema);