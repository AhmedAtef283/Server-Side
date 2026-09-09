let courses = require('../data/db.js') 
let db = require('../data/fetch.js')


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


async function getCourses(req, res)  {
    MyData = db.MyData;
    const data = await db.MyData.find({});
    res.json(data)
}


function getCourseById (req, res) {
        MyData = db.MyData;
        CourseID = req.params.id
        db.MyData.findById(CourseID)
        .then(course => {
            if (!course) return res.status(404).send('Course not found');
            res.json(course);
        })
        .catch(error => {
            res.status(400).send('Invalid course ID');
        });
}


function updateCourse(req, res) {
    const courseID = req.params.id;

    db.MyData.findByIdAndUpdate(
        courseID, 
        { $set: req.body }, 
        { new: true }
    )
    .then(course => {
        if (!course) return res.status(404).send('Course not found');
        res.json(course);
    })
    .catch(error => {
        console.error('Update Error:', error);
        res.status(400).send('Invalid course ID or data');
    });
}

function deleteCourse  (req, res) {
        MyData = db.MyData;
        CourseID = req.params.id
        db.MyData.findByIdAndDelete(CourseID)
        .then(course => {
            if (!course) return res.status(404).send('Course not found');
            res.status(200).json(`Course deleted successfully`);
        })
        .catch(error => {
            res.status(400).send('Invalid course ID');
        });
}












module.exports = {
    postCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
}
