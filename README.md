# nodejs_learnable_crashcource
crash course for learnable node js class

This is simulation of writing and reading to/from a file.

Implemented with express.js as the only dependency.
It does not follow it fork's structure and/or pattern, thus it uses promises, and expressjs instead of `callback` and native `node` way of server setup and usage..

## Usage
On console do: `npm install` to install the only dependency which is express.
To start the server do: `node index.js`
This will start a server at: `localhost:3000` or at any other chosen/preferred port

## Endpoints
- Books endpoint: `localhost:3000/books`
- Users endpoint: `localhost:3000/users`

check the directories: `providers/routes.js` and `routes/` to see the routes and it requirements

#
The users and books created are located in the `database/` directory

## Features:
- CRUD operation on users: 
- CRUD operation on books
- User can request to borrow a book
- `*` *User cannot return book yet*. 
- `*` *There is no access control or roles yet*
`*` These features aee not available yet, and may not be implement. The aim, reading and writing to files, of the project has been achieve.

