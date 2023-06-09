const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const blogPostRoutes = require('./blogPostRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/post', blogPostRoutes);


router.get('/comment', (req, res) => {
    res.render('new-comment');
});

module.exports = router;