
/**
 * @class Book
 */

class Book {
    
    constructor (name, author, publisher, price = 0, isbn_number, count=1) {
        this.name = name.trim();
        this.author = author.trim();
        this.price = Number.parseInt(price);
        this.publisher = publisher.trim();
        this.isbn_number = isbn_number.trim();
        this.borrowers = []; //list of users's filename that borrowed a book
        this.count = count;
    }

    validate() {
        
        let name = typeof(this.name) === 'string' && this.name.length > 0 ? this.name : false;
        let price = !isNaN(this.price) ? this.price : false;
        let author = typeof(this.author) === 'string' && this.author.length > 0 ? this.author : false;
        let publisher = typeof(this.publisher) === 'string' && this.publisher.length > 0 ? this.publisher : false;
        let count = !isNaN(this.count) ? this.count : false;
        
        if (!(name && price && author && publisher && count)) {
            return false;
        }
        return true;

    }

    
}


exports.Book = Book;
