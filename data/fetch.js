const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://aatef83156_db_user:DB_123@db.x72asvs.mongodb.net/Node';

const existingDataSchema = new mongoose.Schema({
    topic: String,
    difficulty: Number,
    price: String,
    release_year: Number,
    format: String,
    url: String,
    label: String,
    author: String
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
