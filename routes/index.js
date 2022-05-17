const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send(`Oops! That wasn't a valid route.`));

module.exports = router;
