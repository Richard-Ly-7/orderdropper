const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ImageKit = require('imagekit');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

let imageKit;
let useImageKit = process.env.USE_IMAGEKIT === "true";

if(useImageKit){
    imageKit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URI
    });
}

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, role, address, description, base64 } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser){
            return res.status(409).json({ error: 'Email already taken' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        let image;
        let imageKitFileId;
        
        if(useImageKit && imageKit && base64) {
            const base64String = base64.split(',')[1];
            const imageKitRes = await imageKit.upload({
                file: base64String,
                fileName: `${username}`,
                folder: '/order_dropper'
            });
            image = imageKitRes.url;
            imageKitFileId = imageKitRes.fileId;
        }else{
            image = base64;
        }

        const newUser = new User({ username, email, passwordHash, role, address, image, imageKitFileId });
        await newUser.save();

        if(role === "restaurant"){
            const restaurant = new Restaurant({ name: username, address, description, image, imageKitFileId, userEmail: email });
            await restaurant.save();

            newUser.restaurantId = restaurant._id;
            await newUser.save();
        }

        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({...newUser._doc, id: newUser._id});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Signup failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(401).json({ error:'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json({ ...user._doc, id: user._id });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/me', verifyToken, async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Missing token' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select('username email createdAt address role base64 restaurantId shoppingCart');
        res.json(user);
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    res.json({ message: 'Logged out successfully' });
});



module.exports = router;