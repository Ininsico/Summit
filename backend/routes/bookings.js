import express from 'express';
import { body, validationResult } from 'express-validator';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', protect, [
    body('type').isIn(['destination', 'vehicle', 'trip']).withMessage('Invalid booking type'),
    body('itemName').notEmpty().withMessage('Item name is required'),
    body('startDate').isISO8601().withMessage('Valid start date is required'),
    body('endDate').isISO8601().withMessage('Valid end date is required'),
    body('guests').isInt({ min: 1 }).withMessage('At least 1 guest is required'),
    body('totalPrice').isNumeric().withMessage('Total price must be a number')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const {
            type,
            tripType,
            itemName,
            destination,
            startDate,
            endDate,
            guests,
            totalPrice,
            specialRequests
        } = req.body;

        const booking = await Booking.create({
            user: req.user._id,
            type,
            tripType,
            itemName,
            destination,
            startDate,
            endDate,
            guests,
            totalPrice,
            specialRequests
        });

        // Add booking to user
        await User.findByIdAndUpdate(req.user._id, {
            $push: { bookings: booking._id }
        });

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during booking'
        });
    }
});

// @route   GET /api/bookings
// @desc    Get all user bookings
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({
            success: true,
            bookings
        });
    } catch (error) {
        console.error('Fetch bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching bookings'
        });
    }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, booking });
    } catch (error) {
        console.error('Fetch booking error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PATCH /api/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.patch('/:id/cancel', protect, async (req, res) => {
    try {
        const booking = await Booking.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { status: 'cancelled' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.json({
            success: true,
            message: 'Booking cancelled',
            booking
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
