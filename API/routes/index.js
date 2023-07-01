const express = require('express')
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/category', require('./category'));
router.use('/item', require('./item'));
router.use('/product', require('./product'));
router.use('/price', require('./price'));

module.exports = router;