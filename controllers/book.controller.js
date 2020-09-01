// const { User } = require('../models/user.model');
const fileUtil = require('../utilities/file.util');



// retrieve a book
exports.detail = async (req, res) => {
    // return res.send(req.params.name);
    if (req.params.name) {
       try {
       const book = await fileUtil.find('books', req.params.name);

        if(!book) return res.status(404).send({ message: 'book not found', data: null });
        
        res.status(200).send({ message: 'book retrieved!', data: book });

       } catch (err) {
        res.status(500).send({ message: err, data: null });
        
       };

    } else {
        
        res.send('No file name provided')
    }

};


// list all books
exports.list = async (req, res) => {
    try {
        const books = await fileUtil.all('books');
        res.status(200).send({ message: 'books retrieved', data: books });
    
    } catch (error) {
        return res.status(404).send({ message: 'book not found', data: null });

    }
        
};


// update a book
exports.update = async (req, res) => {
    
    try {
        let book = await fileUtil.update('books', req.params.name, req.body);
        res.send(book);
    } catch (error) {

    }
}

// delete a file
exports.delete = async (req, res) => {
    let message = await fileUtil.delete('books', req.params.name);
    
    if (message.errno) return res.status(404).send(message);
    
    res.status(200).send('deletion was successful');
}

