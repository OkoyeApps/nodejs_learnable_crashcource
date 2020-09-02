const express = require('express');

const users = require('../routes/users.route');
const books = require('../routes/books.route');

/**
 * List of routes and middlewares
 */
module.exports = function r(app) {
  app.use(express.json());
  app.use('/books', books);
  app.use('/users', users);


};
