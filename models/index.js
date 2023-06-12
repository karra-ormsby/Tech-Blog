const Comment = require('./Comment');
const BlogPost = require('./BlogPost');
const User = require('./User');

//Relationship between BlogPost and User
BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//Relationship between Comment and User
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//Relationship between Comment and BlogPost
Comment.belongsTo(BlogPost, {
    foreignKey: "blog_id"
});

BlogPost.hasMany(Comment, {
    foreignKey: "blog_id",
    onDelete: 'CASCADE'
});

module.exports = {
    Comment,
    BlogPost,
    User
};
