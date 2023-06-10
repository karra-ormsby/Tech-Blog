const router = require('express').Router();
const { BlogPost, Comment } = require('../models');

//GET all blog posts
router.get("/", async (req, res) => {
    try {
        const blogData = await BlogPost.findAll();

        const blogs = blogData.map((blogpost) =>
            blogpost.get({ plain: true })
        );

        res.render("homepage", { blogs });
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

module.exports = router;