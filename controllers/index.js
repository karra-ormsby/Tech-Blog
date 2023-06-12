const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const blogPostRoutes = require('./blogPostRoutes');

const { BlogPost, User } = require('../models');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', blogPostRoutes);


router.get("/", async (req, res) => {
    try {
        const blogData = await BlogPost.findAll(
            {
                include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                ],
            }
        );

        const blogs = blogData.map((blogpost) =>
            blogpost.get({ plain: true })
        );

        res.render("homepage", { blogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/comment', (req, res) => {
    res.render('new-comment');
});

module.exports = router;