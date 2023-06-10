const router = require('express').Router();
const { BlogPost, Comment } = require('../models');

// /dashboard
router.get("/", async (req, res) => {
    try {
        const blogData = await BlogPost.findAll();

        const blogs = blogData.map((blogpost) =>
            blogpost.get({ plain: true })
        );

        const commentData = await Comment.findAll({
            include: [{ model: BlogPost }]
        });

        const comments = commentData.map((comment) =>
            comment.get({ plain: true })
        );

        res.render("dashboard", { blogs, comments });
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// /dashboard/new
router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;