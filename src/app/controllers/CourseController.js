const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
        .then(course => 
            res.render('courses/show', { course: mongooseToObject(course) })
        )
        .catch(next);
  }

  create(req, res, next) {
    res.render('courses/create');
  }

  store(req, res, next) {
    req.body.image = req.file.path.split("\\").slice(1).join("/");
    var i = {
      name: req.body.name,
      description: req.body.description,
      videoId: req.body.videoId,
      image: req.body.image
  }
    const course = new Course(i);
    course.save()
      .then(() => res.redirect('/'))
      .catch(error => {

      });
  }
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course => res.render('courses/edit', {
        courses: mongooseToObject(course)
      }))
      .catch(next);
  }
  update(req, res, next) {
    var ii = {};
        if (req.files){
            req.body.image = req.file.path.split("\\").slice(1).join("/");
            ii = {
              name: req.body.name,
              description: req.body.description,
              videoId: req.body.videoId,
              image: req.body.image
            }
        }else {
            ii = {
              name: req.body.name,
              description: req.body.description,
              videoId: req.body.videoId,
              image: req.body.ii
            }
        }
    Course.updateOne({ _id: req.params.id }, ii)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
  }
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new CourseController(); //Xuất ra ngoài với require
