const { Book } = require('../models/book.model');
const fileUtil = require('../utilities/file.util');



// create a book
exports.create = async (req, res) => {
    // return res.send(req.boo)
    
    try {
        let book = new Book(
            req.body.name ? req.body.name : res.send('Error: book name not provided'),
            req.body.author ? req.body.author : res.send('Error: book author not provided'),
            req.body.publisher ? req.body.publisher : res.send('Error: book publisher not provided'),
            req.body.price,
            req.body.isbn_number ? req.body.isbn_number : res.send('Error: book isbn_number not provided')
        )

        if (!book.validate()) return res.send('Error: make sure the book name, author, publisher and isbn_number are provided');
        
        book = await fileUtil.create('books', {...book});
        if(book.errno) return res.status(500).send(book)
        res.send({status: 'success', data: book});

    } catch (err) {
        console.error(err);
        res.send(err);
    }

}

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

