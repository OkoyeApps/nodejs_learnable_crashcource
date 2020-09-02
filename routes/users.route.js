const express = require('express');

const router = express.Router();

const user = require('../controllers/user.controller');

/**
 * Define user routes
 * Using base: users
 */


router.get('/:id', user.detail);
router.get('/', user.list);

router.post('/', user.create);
router.put('/:id', user.update);
router.patch('/:id', user.update);
router.delete('/:id', user.delete);
// router.post('/login', user.login);

module.exports = router;
