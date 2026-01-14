import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Mountains', 'Valleys', 'Lakes', 'Historical', 'Coastal']
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    highlights: [{
        type: String
    }],
    bestTime: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Moderate', 'Hard']
    },
    duration: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '/default-destination.jpg'
    },
    price: {
        type: Number,
        default: 50000
    }
}, {
    timestamps: true
});

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
