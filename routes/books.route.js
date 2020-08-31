const express = require('express');

const router = express.Router();

const book = require('../controllers/book.controller');

/**
 * Define book routes
 * Using base: books
 */


router.get('/:name', book.detail);
router.get('/', book.list);
// router.post('/', book.create);
// router.put('/:name', book.update);
// router.delete('/:name', book.delete);
// router.patch('/:name', book.update);

module.exports = router;
