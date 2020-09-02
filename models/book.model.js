
/**
 * @class Book
 */

class Book {
    // private properties
    // Note this is not visible on an instance but access via getter
    #isLended;

    constructor (name, author, publisher, price = 0, isbn_number, total=1) {
        this.name = name.trim();
        this.author = author.trim();
        this.price = Number.parseInt(price);
        this.publisher = publisher.trim();
        this.isbn_number = isbn_number.trim();
        this.isRented = false;
        this.total = total;
    }

    validate() {
        
        let name = typeof(this.name) === 'string' && this.name.length > 0 ? this.name : false;
        let price = !isNaN(this.price) ? this.price : false;
        let author = typeof(this.author) === 'string' && this.author.length > 0 ? this.author : false;
        let publisher = typeof(this.publisher) === 'string' && this.publisher.length > 0 ? this.publisher : false;
        let total = !isNaN(this.total) ? this.total : false;
        
        if (!(name && price && author && publisher && total)) {
            return false;
        }
        return true;

    }

    
}

// const book = new Book('Things', 'Chi', 'London', 2, '112345pp-dd');
// console.log(book.validate());

exports.Book = Book;
