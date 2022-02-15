const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    storedCourses(req, res, next) {
        Course.find({})
            .then(courses => res.render('me/stored-courses', {
                courses: mutipleMongooseToObject(courses)
            }))   
    }
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))   
    }   
}

module.exports = new MeController(); //Xuất ra ngoài với require