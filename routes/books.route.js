const express = require('express');

const router = express.Router();

const book = require('../controllers/book.controller');

/**
 * Define book routes
 * Using base: books
 */


router.get('/:filename', book.detail);
router.get('/', book.list);

/**
sample request body
{
	"name": "Book name",
	"price": 0,
	"author": "author's name",
	"publisher": "London",
    "isbn_number": "123-2345",
    "total": 1
}
*/
// post requires full sample request body
router.post('/', book.create);
// put and patch requires full or some part of the sample request body
router.put('/:filename', book.update);
router.patch('/:filename', book.update);

router.delete('/:filename', book.delete);


module.exports = router;
