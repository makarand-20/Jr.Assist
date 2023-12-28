const Blog = require('../models/blogModel');
const User = require('../models/userModel');

const createBlog = async (req, res) => {
    const {title, body, image, category, author} = req.body;
    try {

        if(!title || !image || !category || !author){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all required fields',
            })
        }

        const checkUser = await User.findById(author);
        if(!checkUser){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            })
        }

        //check if isProfileComplete is true or false
        if(!checkUser.isProfileComplete){
            return res.status(400).json({
                status: 'fail',
                message: 'Please complete your profile to create a blog',
            })
        }

        const newBlog = new Blog({
            title,
            body,
            image,
            category,
            author,
        })

        const session = await Blog.startSession();
        session.startTransaction();
        await newBlog.save({session});
        checkUser.blogs.push(newBlog);
        await checkUser.save({session});
        await session.commitTransaction();

        const saveBlog = await newBlog.save();

        res.status(201).json({
            status: 'success',
            message: 'Blog created successfully',
            data: saveBlog,
        })
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

const getAllBlogs = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9;
      const skip = (page - 1) * limit;
      const { query } = req.query;

        if (query) {
            const searchedBlogs = await Blog.find({ $text: { $search: query } })
            .select('-body -__v -updatedAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

            const totalBlogsCount = await Blog.countDocuments();
            if (searchedBlogs.length > 0) {
                res.status(200).json({
                BlogCount: searchedBlogs.length,
                TotalBlogs: totalBlogsCount,
                TotalPages: Math.ceil(totalBlogsCount / limit),
                CurrentPage: page,
                searchedBlogs,
                });
            } else {
                res.status(404).json({
                status: 'fail',
                message: 'No blogs found',
                });
            }
        }
        else
        {
            const blogs = await Blog.find({})
            .select('-body -__v -updatedAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    
            const totalBlogsCount = await Blog.countDocuments();
    
            if (blogs.length > 0) {
                res.status(200).json({
                BlogCount: blogs.length,
                TotalBlogs: totalBlogsCount,
                TotalPages: Math.ceil(totalBlogsCount / limit),
                CurrentPage: page,
                blogs,
                });
            } else {
                res.status(404).json({
                status: 'fail',
                message: 'No blogs found',
                });
            }
        }
    } 
    catch (err) {
      res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }
  };
  

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author');
        if(blog){
            res.status(200).json({
                blog
            });
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'No blog found',
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findByIdAndDelete(id).populate('author');
        await blog.author.blogs.pull(blog);
        await blog.author.save();
        //return response
        res.status(200).json({ message: 'Blog deleted successfully!' });
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

const updateBlog = async (req, res) => {
    try {
        const {id}  = req.params;
        const {title, image, category} = req.body;

        if(!title || !image || !category){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all required fields',
            })
        }

        const updateBlog = await Blog.findByIdAndUpdate(id, {...req.body}, {new: true});

        res.status(200).json({
            message: 'Blog updated successfully!',
        });
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

const getBlogsByAuthor = async (req, res) => {
    try {
        const {id} = req.params;
        const blogs = await Blog.find({author: id}).select('-body -__v -updatedAt').sort({createdAt: -1});
        if(blogs){
            res.status(200).json({
                BlogCount: blogs.length,
                blogs
            })
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'Blogs not found',
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

const company = async (req, res) => {
    try {
        const {category} = req.params;
        const blogs = await Blog.find({category: 'Company'}).select('-body -__v -updatedAt').sort({createdAt: -1});
        if(blogs){
            res.status(200).json({
                BlogCount: blogs.length,
                blogs
            })
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'Blogs not found',
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}
const technology = async (req, res) => {
    try {
        const {category} = req.params;
        const blogs = await Blog.find({category: 'Technology'}).select('-body -__v -updatedAt').sort({createdAt: -1});
        if(blogs){
            res.status(200).json({
                BlogCount: blogs.length,
                blogs
            })
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'Blogs not found',
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}
const clubs = async (req, res) => {
    try {
        const {category} = req.params;
        const blogs = await Blog.find({category: 'clubs'}).select('-body -__v -updatedAt').sort({createdAt: -1});
        if(blogs){
            res.status(200).json({
                BlogCount: blogs.length,
                blogs
            })
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'Blogs not found',
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}
const general = async (req, res) => {
    try {
        const {category} = req.params;
        const blogs = await Blog.find({category: 'General'}).select('-body -__v -updatedAt').sort({createdAt: -1});
        if(blogs){
            res.status(200).json({
                BlogCount: blogs.length,
                blogs
            })
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'Blogs not found',
            })
        }
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

//upvote blog, one user can upvote a blog only once. and save the upvoted blog in user's upvoted blogs array
const upvoteBlog = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;

        //check if user has already upvoted the blog
        const alredayUpvoted = await Blog.findOne({_id: id, upvotes: userId});
        if(alredayUpvoted){
            return res.status(400).json({
                status: 'fail',
                message: 'You have already upvoted this blog',
            })
        }
        //if user has not upvoted the blog, then upvote the blog and save the blog in user's upvoted blogs array
        const blog = await Blog.findByIdAndUpdate(id, {$push: {upvotes: userId}}, {new: true});
        await User.findByIdAndUpdate(userId, {$push: {upvotedBlogs: blog}}, {new: true});

        res.status(200).json({
            message: 'Blog upvoted successfully!',
        });
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

const countBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().select('-body -__v -updatedAt -createdAt -author -category -image -title ');


        let totalUpvotes = 0;
        blogs.forEach((blog) => {
          totalUpvotes += blog.upvotes.length;
        });

        // Calculate the total views
        let totalViews = 0;
        blogs.forEach(blog => {
        totalViews += blog.views;
        });

        res.status(200).json({
            blogs,
            blogCount : blogs.length,
            totalViews,
            totalUpvotes,
        })
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message,
        })
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogsByAuthor,
    company,
    technology,
    clubs,
    general,
    upvoteBlog,
    countBlogs
}