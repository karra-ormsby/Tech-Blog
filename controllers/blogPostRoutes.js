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
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment
                },
            ],
        });

        const post = postData.get({ plain: true });

        console.log(post)

        res.render('post', { post, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;