const { Book } = require('../models/book.model');
const { User } = require('../models/user.model');
const userController = require('../controllers/user.controller');
const bookController = require('../controllers/book.controller');
const fileUtil = require('../utilities/file.util');


// make a request
exports.makeRequest = async (req, res) => {

    try {
        
        // verify user
        let user = await fileUtil.find('users', req.body.userId);
        if(!user) return res.status(404).send({ message: 'user not found', data: null });
        
        // verify book
        let book = await fileUtil.find('books', req.params.filename);

        if(!book) return res.status(404).send({ message: 'book not found', data: null });
        
        // check if the book is available for rent
        let bookIsAvailable = book.borrowers.length === book.count;
        if(!bookIsAvailable) return res.send('This book is not available for now, check back next time')
        
        // reduce the number/count of available this book
        book.count = book.count - 1;

        // rent the book to the user
        user.books.push(book);

        // update book and user
        book = await fileUtil.update('books', req.params.id, req.body);
        user = await fileUtil.update('users', req.params.userId, req.body);


        
        res.send({status: 'success', book, user});

    } catch (err) {
        console.error(err);
        res.send(err);
    }

}