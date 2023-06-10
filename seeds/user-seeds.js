const { User } = require('../models');

const userData = [
    {
        username: "user1", 
        password: "12345678"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;