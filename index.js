require('dotenv').config();
const path = require('path');
const express = require('express');
const DB = require('./data/fetch.js');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const coursesRoutes = require('./routes/courses.routes.js');

app.use('/api/courses', coursesRoutes);

app.listen(process.env.port, () => {
    console.log(`Example app listening on localhost:${process.env.port}`);
    DB.Connect();
});
