const express = require('express');
const router = express.Router();
const AddSales = require('../models/Sale'); // Assuming schema is in a separate file

// POST route to add a sale
router.post('/add', async (req, res) => {
    try {
        const { productName, quantity, amount } = req.body;
        const newSale = new AddSales({ productName, quantity, amount });
        await newSale.save();
        res.status(201).json({ message: 'Sale added successfully' });
    } catch (error) {
        console.error('Error adding sale:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route to retrieve top 5 sales
router.get('/top-sales', async (req, res) => {
    try {
        const topSales = await AddSales.find().sort({ amount: -1 }).limit(5);
        res.status(200).json({ topSales });
    } catch (error) {
        console.error('Error retrieving top sales:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route to calculate today's revenue
router.get('/revenue', async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const todayRevenue = await AddSales.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfDay, $lt: endOfDay }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$amount' }
                }
            }
        ]);
        if (todayRevenue.length > 0) {
            res.status(200).json({ Totalrevenue: todayRevenue[0].totalRevenue });
        } else {
            res.status(200).json({ Totalrevenue: 0 });
            
        }
    } catch (error) {
        console.error('Error calculating today\'s revenue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
