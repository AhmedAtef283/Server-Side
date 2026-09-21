let db = require('../data/fetch.js')


function postCourse (req, res){
    const newCourse = {
        topic: req.body.topic,
        difficulty: req.body.difficulty,
        price: req.body.price,
        release_year: req.body.release_year,
        format: req.body.format,
        url: req.body.url,
        label: req.body.label,
        author: req.body.author
    };
    db.MyData.create(newCourse)
    .then(course => {
        res.status(201).json({ status: "success", data: { course } });
    })
    .catch(error => {
        res.status(400).json({ status: "error", message: "Error creating course" });
    });
}


async function getCourses(req, res)  {
    MyData = db.MyData;
    const data = await db.MyData.find({});
    res.json({ status: "success",  data: { courses: data } });
}


function getCourseById (req, res) {
        MyData = db.MyData;
        CourseID = req.params.id
        db.MyData.findById(CourseID)
        .then(course => {
            if (!course) return res.status(404).json({ status: "error", message: "Course not found" });
            res.json({ status: "success", data: { course } });
        })
        .catch(error => {
            res.status(400).json({ status: "error", message: "Invalid course ID" });
        });
}


function updateCourse(req, res) {
    const courseID = req.params.id;

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ status: "error", message: "Request body cannot be empty" });
    }
    db.MyData.findByIdAndUpdate(
        courseID, 
        { $set: req.body }, 
        { returnDocument: 'after', runValidators: true, context: 'query' }
    )
    .then(course => {
        if (!course) return res.status(404).json({ status: "error", message: "Course not found" });
        res.json({ status: "success", data: { course } });
    })
    .catch(error => {
        console.error('Update Error:', error);
        res.status(400).json({ status: "error", message: "Invalid course ID, missing required fields, or invalid data format" });
    });
}

function deleteCourse  (req, res) {
        MyData = db.MyData;
        CourseID = req.params.id
        db.MyData.findByIdAndDelete(CourseID)
        .then(course => {
            if (!course) return res.status(404).json({ status: "error", message: "Course not found" });
            res.json({ status: "success", message: "Course deleted successfully" });
        })
        .catch(error => {
            res.status(400).json({ status: "error", message: "Invalid course ID" });
        });
}

module.exports = {
    postCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
}
