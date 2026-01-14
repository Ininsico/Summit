import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from './models/Destination.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const destinations = [
    {
        name: 'Hunza Valley',
        category: 'Valleys',
        location: 'Gilgit-Baltistan',
        description: 'A breathtaking valley surrounded by snow-capped peaks, ancient forts, and vibrant apricot orchards.',
        highlights: ['Altit Fort', 'Baltit Fort', 'Attabad Lake', 'Passu Cones'],
        bestTime: 'April - October',
        difficulty: 'Easy',
        duration: '5-7 Days',
        image: '/hunza.jpg',
        price: 45000
    },
    {
        name: 'Fairy Meadows',
        category: 'Mountains',
        location: 'Gilgit-Baltistan',
        description: 'One of the most beautiful alpine meadows with stunning views of Nanga Parbat, the 9th highest mountain.',
        highlights: ['Nanga Parbat Base Camp', 'Beyal Camp', 'Raikot Glacier'],
        bestTime: 'May - September',
        difficulty: 'Moderate',
        duration: '3-4 Days',
        image: '/fairy-medows.jpg',
        price: 35000
    },
    {
        name: 'Skardu',
        category: 'Mountains',
        location: 'Gilgit-Baltistan',
        description: 'Gateway to some of the highest peaks on Earth, including K2. A paradise for mountaineers and adventurers.',
        highlights: ['Shangrila Resort', 'Satpara Lake', 'Deosai Plains', 'Shigar Fort'],
        bestTime: 'April - October',
        difficulty: 'Moderate',
        duration: '6-8 Days',
        image: '/skardu.jpg',
        price: 55000
    },
    {
        name: 'Nanga Parbat',
        category: 'Mountains',
        location: 'Gilgit-Baltistan',
        description: 'The "Killer Mountain" - 9th highest peak in the world, offering challenging treks and spectacular views.',
        highlights: ['Base Camp Trek', 'Rupal Face', 'Diamir Face', 'Fairy Meadows'],
        bestTime: 'June - September',
        difficulty: 'Hard',
        duration: '7-10 Days',
        image: '/NangaParbat.jpg',
        price: 75000
    },
    {
        name: 'Neelum Valley',
        category: 'Valleys',
        location: 'Azad Kashmir',
        description: 'A stunning valley along the Neelum River with dense forests, waterfalls, and picturesque villages.',
        highlights: ['Arang Kel', 'Sharda', 'Kel', 'Taobat'],
        bestTime: 'April - October',
        difficulty: 'Easy',
        duration: '5-6 Days',
        image: '/neelumvalley.jpg',
        price: 40000
    },
    {
        name: 'Rakaposhi',
        category: 'Mountains',
        location: 'Gilgit-Baltistan',
        description: 'The 27th highest mountain in the world, known for its perfect pyramid shape and stunning beauty.',
        highlights: ['Rakaposhi Base Camp', 'Minapin Glacier', 'Diran Peak', 'Nagar Valley'],
        bestTime: 'May - September',
        difficulty: 'Moderate',
        duration: '4-6 Days',
        image: '/Rakaposhi.jpg',
        price: 50000
    },
    {
        name: 'Mohenjo-daro',
        category: 'Historical',
        location: 'Sindh',
        description: 'Ancient Indus Valley Civilization site, a UNESCO World Heritage Site dating back to 2500 BCE.',
        highlights: ['Great Bath', 'Assembly Hall', 'Museum', 'Ancient Streets'],
        bestTime: 'November - February',
        difficulty: 'Easy',
        duration: '1 Day',
        image: '/Mohenjo-daro.jpg',
        price: 15000
    },
    {
        name: 'Naran Kaghan',
        category: 'Valleys',
        location: 'Khyber Pakhtunkhwa',
        description: 'Popular tourist destination with beautiful valleys, lakes, and the famous Babusar Pass.',
        highlights: ['Lake Saif ul Malook', 'Babusar Top', 'Lulusar Lake', 'Ansoo Lake'],
        bestTime: 'May - September',
        difficulty: 'Moderate',
        duration: '4-5 Days',
        image: '/naran.jpg',
        price: 38000
    }
];

const seedData = async () => {
    try {
        await Destination.deleteMany();
        await Destination.insertMany(destinations);
        console.log('✅ Destinations seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
