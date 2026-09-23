require('dotenv').config();
const path = require('path');
const express = require('express');
const DB = require('./data/fetch.js');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Cache the DB connection across serverless invocations so we don't
// reconnect to MongoDB on every single request. This MUST run before
// any route that touches the database.
let isConnected = false;
app.use(async (req, res, next) => {
    if (!isConnected) {
        try {
            await DB.Connect();
            isConnected = true;
        } catch (err) {
            console.error('DB connection failed:', err);
            return res.status(500).json({ status: 'error', message: 'Database connection failed' });
        }
    }
    next();
});

const coursesRoutes = require('./routes/courses.routes.js');
app.use('/api/courses', coursesRoutes);

const port = process.env.port || process.env.PORT || 3000;

// Only actually start a listening server when running locally
// (`npm run dev` / `npm start`). On Vercel, the platform itself
// invokes the exported `app` per-request, so app.listen() must
// be skipped there.
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Example app listening on localhost:${port}`);
        DB.Connect();
        isConnected = true;
    });
}

module.exports = app;