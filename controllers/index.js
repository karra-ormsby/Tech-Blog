const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const blogPostRoutes = require('./blogPostRoutes');

const { BlogPost, Comment } = require('../models');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', blogPostRoutes);


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

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/comment', (req, res) => {
    res.render('new-comment');
});

// router.get('/post/:id', async (req, res) => {
//     try {
//         const postData = await BlogPost.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: Comment
//                 },
//             ],
//         });

//         const post = postData.get({ plain: true });

//         console.log(post)

//         res.render('post', post);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
module.exports = router;