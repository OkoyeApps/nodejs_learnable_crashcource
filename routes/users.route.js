const express = require('express');

const router = express.Router();

const controller = require('../controllers/user.controller');

/**
 * Define user routes
 * Using base: users
 */


router.get('/:id', controller.userDetail);
router.get('/', controller.userList);

router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.destroyUser);
router.post('/login', controller.loginUser);

module.exports = router;
