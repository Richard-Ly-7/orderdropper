const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', verifyToken, async (req, res) => {
    if(req.user.role !== "customer"){
        return res.status(401).json({ error: 'User must be a customer' });
    }
    try {
        const user = await User.findById(req.params.id);
        user?.shoppingCart ? res.json({ shoppingCart: user.shoppingCart }) : res.status(404).json({ error: 'User not found' });
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    if(req.user.role !== "customer"){
        return res.status(401).json({ error: 'User must be a customer' });
    }
    const { shoppingCart } = req.body;
    try{
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { shoppingCart } },
            { new : true }
        );

    updated ? res.json({ message: 'Shopping cart updated' }) : res.status(404).json({ error: 'Not found' });

    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
});


module.exports = router;