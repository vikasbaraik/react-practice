const express = require('express');
const router = express.Router();
const Calculation = require('../models/Calculation');

// Get last 10 calculations
router.get('/', async (req, res) => {
    const calculations = await Calculation.find().sort({ createdAt: -1 }).limit(10);
    res.json(calculations);
});

// Save new calculation
router.post('/', async (req, res) => {
    const { expression, result } = req.body;
    const newCalc = new Calculation({ expression, result });
    await newCalc.save();

    // Delete older calculations if > 10
    const total = await Calculation.countDocuments();
    if (total > 10) {
        const oldest = await Calculation.find().sort({ createdAt: 1 }).limit(total - 10);
        for (let calc of oldest) await calc.deleteOne();
    }

    res.status(201).json(newCalc);
});

module.exports = router;
