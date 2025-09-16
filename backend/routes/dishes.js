const express = require('express');
const rateLimit = require('express-rate-limit');
const ImageKit = require('imagekit');
const Dish = require('../models/Dish');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
let imageKit;
let useImageKit = process.env.USE_IMAGEKIT === "true";

if(useImageKit){
    imageKit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URI
    });
}
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: 'Too many requests, try again later.'
// });

// router.use(limiter);

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const searchQuery = req.query.searchQuery || "";

        const startIndex = limit * (page - 1);

        const dishes = await Dish.find().sort({createdAt: -1});
        const filteredDishes = searchQuery ? 
            dishes.filter((dish) => 
                dish.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) : dishes;
        const totalDishes = filteredDishes.length;
        const displayedDishes = filteredDishes.slice(startIndex, startIndex + limit);
        res.json({
            dishes: displayedDishes.map(dish => ({...dish._doc, id: dish._id})),
            totalDishes
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dishes' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id);
        dish ? res.json({ ...dish._doc, id: dish._id}) : res.status(404).json({ error: 'Dish not found' });
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
});


router.post('/', verifyToken, async (req, res) => {
    if(req.user.role !== "restaurant"){
        return res.status(401).json({ error: 'User must have the restaurant role' });
    }
    try {
        const { name, price, base64, restaurant, restaurantId } = req.body;

        let imageSrc;
        let imageKitFileId;

        if(useImageKit && imageKit && base64) {
            const base64String = base64.split(',')[1];
            const imageKitRes = await imageKit.upload({
                file: base64String,
                fileName: `${restaurant}_${name}`,
                folder: '/order_dropper'
            });

            imageSrc = imageKitRes.url;
            imageKitFileId = imageKitRes.fileId;
        }else{
            imageSrc = base64;
        }

        const newDish = new Dish({
            name,
            price,
            restaurant,
            restaurantId,
            image: imageSrc
        });

        if(imageKitFileId){
            newDish.imageKitFileId = imageKitFileId;
        }

        const saved = await newDish.save();
        res.status(201).json({ ...saved._doc, id: saved._id });
    } catch {
        res.status(400).json({ error: 'Invalid input' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    if(req.user.role !== "restaurant"){
        return res.status(401).json({ error: 'User must have the restaurant role' });
    }
    try {
        const {updatedDish, image} = req.body;
        const dish = await Dish.findById(req.params.id);

        console.log(updatedDish);
        if(!dish){
            return res.status(404).json({ error: 'Dish not found' });
        }

        if(dish.imageKitFileId && !useImageKit && image){
            return res.status(400).json({ error: 'Cannot update ImageKit dish image while ImageKit is disabled' });
        }

        if(useImageKit && imageKit && image){
            const base64String = image.split(',')[1];
            const imageKitRes = await imageKit.upload({
                file: base64String,
                fileName: `${dish.restaurant}_${dish.name}.jpg`,
                folder: '/order_dropper'
            });

            if(dish.imageKitFileId){
                try{
                    await imageKit.deleteFile(dish.imageKitFileId);
                }catch(err){
                    return res.status(400).json({ error: 'Failed to delete ImageKit file' });
                }
            }

            updatedDish.image = imageKitRes.url;
            updatedDish.imageKitFileId = imageKitRes.fileId;
        }

        console.log(updatedDish);

        await Dish.findByIdAndUpdate(
            req.params.id,
            { $set: updatedDish }
        );
        res.json({ message: 'Dish updated' });
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    if(req.user.role !== "restaurant"){
        return res.status(401).json({ error: 'User must have the restaurant role' });
    }
    try {
        const dish = await Dish.findById(req.params.id);
        if(!dish){
            return res.status(404).json({ error: 'Not found' });
        } 

        if(dish.imageKitFileId && !useImageKit){
            return res.status(400).json({ error: 'Cannot delete ImageKit dish image while ImageKit is disabled' });
        }

        if(useImageKit && imageKit && dish.imageKitFileId){
            try{
                await imageKit.deleteFile(dish.imageKitFileId);
            }catch(err){
                return res.status(500).json({ error: 'Failed to delete ImageKit file' });
            }
        }

        await Dish.findByIdAndDelete(req.params.id);
        return res.json({ message: 'Dish deleted' });

    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

module.exports = router;