const router = require('express').Router();
const { User } = require('../../models');

// Signup (CREATE new user)
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.dataValues.id;
            req.session.username = userData.dataValues.username;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!userData) {
            return res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
        }

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user_id = userData.dataValues.id;
            req.session.username = userData.dataValues.username;

            return res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
});


// Logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
            res.render("homepage");
        });
    } else {
        res.status(404).end();
    }
});

//GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;