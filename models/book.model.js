
/**
 * @class Book
 */

class Book {
    // private properties
    // Note this is not visible on an instance but access via getter
    #isLended;

    constructor (name, author, publisher, price = 0, isbn_number) {
        this.name = name.trim();
        this.author = author.trim();
        this.price = Number.parseInt(price);
        this.publisher = publisher.trim();
        this.isbn_number = isbn_number.trim();
        this.isRented = false; 
    }

    validate() {
        
        let name = typeof(this.name) === 'string' && this.name.length > 0 ? this.name : false;
        let price = !isNaN(this.price) ? this.price : false;
        let author = typeof(this.author) === 'string' && this.author.length > 0 ? this.author : false;
        let publisher = typeof(this.publisher) === 'string' && this.publisher.length > 0 ? this.publisher : false;
    
        if (!(name && price && author && publisher)) {
            return false;
        }
        return true;

    }

    
}

// const book = new Book('Things', 'Chi', 'London', 2, '112345pp-dd');
// console.log(book.validate());

exports.Book = Book;
