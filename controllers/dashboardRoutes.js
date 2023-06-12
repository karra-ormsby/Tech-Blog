const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');

// /dashboard
router.get("/", async (req, res) => {
    try {
        const blogData = await BlogPost.findAll({
            // where: { user_id: req.session.user_id },
        });

        const blogs = blogData.map((blogpost) =>
            blogpost.get({ plain: true })
        );

        res.render("dashboard", { blogs });
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// /dashboard/new
router.get('/new', (req, res) => {
    res.render('new-post');
});

// /dashboard/:id
router.get('/:id', async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment
                },
            ],
        });

        const post = postData.get({ plain: true });

        console.log(post)

        res.render('dashboard-blog', post);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;