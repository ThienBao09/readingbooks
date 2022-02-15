const express = require('express');
const multer = require('multer');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

var upload = multer({ dest: './public/uploads/' })

//newsController.index;

router.get('/create', courseController.create);
router.post('/store', upload.single('image'), courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id', upload.single('image'), courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);

module.exports = router;
