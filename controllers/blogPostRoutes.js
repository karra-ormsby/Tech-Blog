const router = require('express').Router();
const { BlogPost, Comment } = require('../models');

// route /post

router.get('/', (req, res) => {
    res.render('new-post');
});

//GET blog post by id
router.get('/:id', async (req, res) => {
    try {
        const postInfo = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                },
            ],
        });

        console.log("postInfo: ", postInfo);

        const blog = postInfo.map((blogpost) =>
            blogpost.get({ plain: true })
        );

        console.log("blog: ", blog);

        res.render("post", { blog });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;