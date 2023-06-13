const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');

// '/post' endpoint

// /post
router.get('/', (req, res) => {
    res.render('new-post');
});

// /post/:id
//GET blog post by id
router.get('/:id', async (req, res) => {
    try {
        const blogData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        console.log('blog: ', blog);

        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            where: { blog_id: blog.id },
        })

        const commentInfo = commentData.map((comment) =>
            comment.get({ plain: true })
        );

        console.log('commentInfo: ', commentInfo);


        res.render('post', { blog, commentInfo, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
        consolelog(err)
    }
});


module.exports = router;