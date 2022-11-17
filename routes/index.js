const router = require('express').Router();

router.use('/', require('./homeRoutes'));
router.use('/api', require('./apiRoutes'));

module.exports = router;