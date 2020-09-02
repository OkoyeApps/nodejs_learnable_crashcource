# nodejs_learnable_crashcource
crash course for learnable node js class

This is simulation of writing and reading to/from a file.

Implemented with express.js as the only dependency
It does not follow it fork structure and pattern, thus it uses promises, and expressjs.

## Usage
On console do: `npm install` to the only dependency
Start the server: `node index.js`
This will start a server at: `localhost:3000` or at any other chosen/preferred port
#
- Books endpoint: `localhost:3000/books`
- Users endpoint: `localhost:3000/users`

check the directories: `providers/routes.js` and `routes/` to see the routes and it requirements

#
users and books created are located in the `database/` directory

#
Features:
- User CRUD
- Book CRUD
- User can request to borrow a book
- *User cannot return book yet*. this feature is not available yet.

