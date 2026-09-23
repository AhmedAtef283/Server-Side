const mongoose = require('mongoose');
require('dotenv').config();

const DB_URI = process.env.DB_URI;

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
    // Already connected (or connecting) - don't reconnect on every invocation.
    if (mongoose.connection.readyState === 1) {
        return;
    }

    console.log('Connecting to database...');

    // Fail fast instead of hanging for the platform's default 30s server
    // selection window - that's longer than Vercel's function timeout,
    // so a real connection failure was showing up as a silent hang.
    await mongoose.connect(DB_URI, {
        serverSelectionTimeoutMS: 5000,
        bufferCommands: false,
    });

    console.log('Connected successfully!');
    // Errors are intentionally NOT caught here - they're re-thrown so
    // index.js can see the failure and respond with a proper error
    // instead of the request hanging until Vercel kills the function.
}

module.exports = { Connect, MyData };