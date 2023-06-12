const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');

// /dashboard
router.get("/", async (req, res) => {
    try {
        if (req.session.logged_in) {
            const blogData = await BlogPost.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
                    where: { user_id: req.session.user_id },
            });

            const blogs = blogData.map((blogpost) =>
                    blogpost.get({ plain: true })
            );

            console.log(blogs)

            res.render("dashboard", { blogs, logged_in: req.session.logged_in });
        } else {
            res.render('login');
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// /dashboard/new
router.get('/new', (req, res) => {
    res.render('new-post', { logged_in: req.session.logged_in });
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

        res.render('dashboard-blog', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;