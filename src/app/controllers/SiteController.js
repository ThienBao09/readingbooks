const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
  //[GET] /news
  index(req, res, next) {
    // res.render('home');
    Course.find({})
        .then(courses => {
            res.render('home', {
                courses: mutipleMongooseToObject(courses)
            });
        })
        .catch(next);
  }

}

module.exports = new SiteController(); //Xuất ra ngoài với require
