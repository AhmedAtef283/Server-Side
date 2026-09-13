const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://aatef83156_db_user:DB_123@db.x72asvs.mongodb.net/Node';

const existingDataSchema = new mongoose.Schema({
    topic: { type: String, required: true, trim: true },
    difficulty: { type: Number, required: true },
    price: { type: String, required: true, trim: true },
    release_year: { type: Number, required: true },
    format: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true }
});

const MyData = mongoose.model('course', existingDataSchema, 'Courses');

async function Connect() {
try {
    console.log('Connecting to database...');
    await mongoose.connect(DB_URI);
    
    console.log('Connected successfully!');
    } catch (error) {
    console.error('Error connecting to database:', error);
    }
    }

module.exports = { Connect, MyData };
