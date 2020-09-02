
/**
 * @class User
 */

class User {

    constructor (name, email) {
        this.name = name.trim();
        this.email = email.trim();
        this.books = []; // book IDs borrowed
    }

    generateUserId() {
        try {
            const prefix = Math.floor(Math.random() * 100);
            const suffix = Math.floor(Math.random() * 100);
            const random = `${prefix}${Date.now()}${suffix}`;

            let id = Number.parseInt(random);
            this.libraryId = id;

            // return this;
        } catch (error) {
            throw Error(error);
        }
    }

    validate() {
        
        let name = typeof(this.name) === 'string' && this.name.length > 0 ? this.name : false;
        let email = typeof(this.email) === 'string' && this.email.length > 0 ? this.email : false;
        
        if (!(name && email)) {
            return false;
        }
        return true;

    }
    
}


exports.User = User;
