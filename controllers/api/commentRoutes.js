const router = require('express').Router();
const { Comment, BlogPost } = require('../../models');

// The `/api/comment` endpoint

//GET all comments for a blogpost
router.get('/', async (req, res) => 
{
    try { 
        const commentData = await Comment.findAll({
            include: [{model: BlogPost}]
        });
        
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//CREATE new comment
router.post('/', async (req, res) => {
    try {
            if (req.session.logged_in) {
            const newComment = await Comment.create({
                comment: req.body.comment,
                user_id: req.session.user_id,
                blog_id: req.body.blog_id
            });
            res.status(200).json(newComment);
        } else {
            console.log("Please login or signup to add a comment.");
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;