const express = require('express');
const app = express()
const port = 3000
app.use(express.json())
const coursesRoutes = require('./routes/courses.routes.js');


app.get('/', (req, res) => {
    res.send('Server is running, try /api/courses')
})

app.use('/api/courses', coursesRoutes);


app.listen(port, () => {
    console.log(`Example app listening on localhost:${port}`)
})


