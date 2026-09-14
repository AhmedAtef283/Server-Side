const express = require('express');
const DB = require('./data/fetch.js');
const app = express()
app.use(express.json())
const coursesRoutes = require('./routes/courses.routes.js');

app.use('/api/courses', coursesRoutes);


app.listen(process.env.port, () => {
    console.log(`Example app listening on localhost:${process.env.port}`)
    DB.Connect();
})



