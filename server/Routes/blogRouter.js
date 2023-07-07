const express = require('express');
const router = express.Router();

const {createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getBlogsByAuthor, company, technology, clubes, general, upvoteBlog} = require('../controllers/blogController');

router.post('/createblog', createBlog);
router.post('/allblogs', getAllBlogs);
router.post('/singleblog/:id', getBlogById);
router.post('/updateblog/:id', updateBlog);
router.post('/deleteblog/:id', deleteBlog);
router.post('/myblog/:id', getBlogsByAuthor);
router.post('/company', company);
router.post('/technology', technology);
router.post('/clubes', clubes);
router.post('/general', general);
router.post('/upvoteblog/:id', upvoteBlog);

module.exports = router;