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
        let bookIsAvailable = book.count > 0;
        if(!bookIsAvailable) return res.send('This book is not available for now, check back next time')
        
        // reduce the number/count of available this book
        book.count = book.count - 1;

        // check if user has borrowed this book
        const alreadyBorrowed = book.borrowers.includes(user.filename)
        if (alreadyBorrowed) return res.send('This book already borrowed by this user');

        // rent the book to the user
        book.borrowers.push(user.filename);
        user.books.push(book.filename);
        // res.send({status: 'success', book, user});

        // update book and user
        book = await fileUtil.update('books', book.filename, book);
        user = await fileUtil.update('users', user.filename, user);

        res.send({status: 'success', book, user});

    } catch (err) {
        console.error(err);
        res.send(err);
    }

}