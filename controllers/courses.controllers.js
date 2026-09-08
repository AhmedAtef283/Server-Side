let courses = require('../data/db.js') 



function postCourse (req, res){
    if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send('Name is required and should be minimum 3 characters.');}
    if (!req.body.price || req.body.price <= 0) {
    return res.status(400).send('Price is required and should be greater than 0.');}
    const course = {
        id: courses.length + 1,
        ...req.body
    }
    console.log(course)
    courses.push(course)
    res.status(201).json(course)
}


function getCourses(req, res) {
    res.json(courses)
}


function getCourseById (req, res) {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Course not found')
    res.json(course)
}


function updateCourse  (req, res){
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Course not found')
    if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send('Name is required and should be minimum 3 characters.');}
    if (!req.body.price || req.body.price <= 0) {
    return res.status(400).send('Price is required and should be greater than 0.');}
    course = { ...course, ...req.body };    
    res.status(200).json(`Course updated successfully`)
}

function deleteCourse  (req, res) {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) return res.status(404).send('Course not found')

    courses = courses.filter(c => c.id !== parseInt(req.params.id))
    res.status(200).json(`Course deleted successfully`)
}












module.exports = {
    postCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
}
