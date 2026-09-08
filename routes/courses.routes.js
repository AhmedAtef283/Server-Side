const router = require('express').Router();
const { getCourses, getCourseById, postCourse, updateCourse, deleteCourse } = require('../controllers/courses.controllers.js');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', postCourse)
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;