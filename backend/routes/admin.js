import express from 'express';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
import Destination from '../models/Destination.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Apply protect and admin middleware to all routes in this router
router.use(protect);
router.use(admin);

// --- Stats ---
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: { $in: ['pending', 'awaiting-approval'] } });
        const unreadMessages = await Message.countDocuments({ status: 'unread' });
        const totalRevenue = await Booking.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalBookings,
                pendingBookings,
                unreadMessages,
                totalRevenue: totalRevenue[0]?.total || 0
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// --- Bookings ---
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'firstName lastName email')
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.put('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/bookings/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// --- Users ---
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        // Prevent deleting self
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ success: false, message: 'You cannot delete yourself' });
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// --- Destinations (Tours) ---
router.post('/destinations', async (req, res) => {
    try {
        const destination = await Destination.create(req.body);
        res.status(201).json({ success: true, destination });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Server error' });
    }
});

router.put('/destinations/:id', async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
        res.json({ success: true, destination });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/destinations/:id', async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
        res.json({ success: true, message: 'Destination deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// --- Messages ---
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.patch('/messages/:id/reply', async (req, res) => {
    try {
        const { reply } = req.body;
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { reply, status: 'replied' },
            { new: true }
        );
        if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
        res.json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/messages/:id', async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
        res.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
