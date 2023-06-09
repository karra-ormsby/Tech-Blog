const { BlogPost } = require('../models');

const postData = [
    {
        title: "Title",
        content: "Content",
        user_id: 1
    },
    {
        title: "Another Blog",
        content: "Some More Content",
        user_id: 1
    },

];

const seedPosts = () => BlogPost.bulkCreate(postData);

module.exports = seedPosts;
