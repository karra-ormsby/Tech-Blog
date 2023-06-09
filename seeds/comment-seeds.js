const { Comment } = require('../models');

const commentData = [
    {
        comment: "Fist Comment Blog 1",
        user_id: 1,
        blog_id: 1
    },
    {
        comment: "Second Comment Blog 1",
        user_id: 1,
        blog_id: 1
    },
    {
        comment: "Fist Comment Blog 2",
        user_id: 1,
        blog_id: 2
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
