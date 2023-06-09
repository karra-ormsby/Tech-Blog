const router = require('express').Router();
const { json } = require('body-parser');
const { BlogPost, Comment } = require('../../models');

// The `/api/post` endpoint

//GET all blog posts
router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll();

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET blog post by id
router.get('/:id', async (req, res) => {
    try {
        const postInfo = await BlogPost.findByPk(req.params.id);
        
        res.status(200).json(postInfo);
    } catch (err) {
        res.status(500).json(err);
    }
});

//CREATE new blog post
router.post('/', async (req, res) => {
    try {
        const newPost = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE blog post by id
router.put('/:id', async (req, res) => {
    try {
        const postData = await BlogPost.update({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        },
        { 
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE blog by id
router.delete('/:id', async (req, res) => {
    try {
        // Find the blog by ID and include its comments
        const blog = await BlogPost.findByPk(req.params.id, {
            include: [Comment],
        });

        // Delete the comments associated with the blog
        await Comment.destroy({
            where: { blog_id: blog.id },
        });

        // Delete the blog
        await blog.destroy();

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

module.exports = router;