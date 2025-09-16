const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    restaurant: { type: String, required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    imageKitFileId: { type: String }
},  { timestamps: true });

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
