const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, 
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    address: { type: String },
    image: { type: String },
    imageKitFileId: { type: String },
    role: { type: String, required: true },
    shoppingCart: { type: [Object] },
    restaurantId: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;