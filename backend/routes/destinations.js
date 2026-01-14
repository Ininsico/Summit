import express from 'express';
import Destination from '../models/Destination.js';

const router = express.Router();

// @route   GET /api/destinations
// @desc    Get all destinations
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find().sort({ createdAt: -1 });
        res.json({ success: true, destinations });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/destinations/:id
// @desc    Get single destination
router.get('/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
        res.json({ success: true, destination });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
