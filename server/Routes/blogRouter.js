const express = require('express');
const router = express.Router();

const {createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getBlogsByAuthor, company, technology, clubs, general, upvoteBlog, countBlogs} = require('../controllers/blogController');

router.post('/createblog', createBlog);
router.post('/allblogs', getAllBlogs);
router.post('/singleblog/:id', getBlogById);
router.post('/updateblog/:id', updateBlog);
router.post('/deleteblog/:id', deleteBlog);
router.post('/myblog/:id', getBlogsByAuthor);
router.post('/company', company);
router.post('/technology', technology);
router.post('/clubs', clubs);
router.post('/general', general);
router.post('/upvoteblog/:id', upvoteBlog);
router.post('/countblogs', countBlogs);

module.exports = router;