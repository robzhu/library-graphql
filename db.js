
//replace 'rethinkdb' with the hostname of your rethinkDB server
var r = require('rethinkdbdash')({servers:[{host:'rethinkdb', port:28015}]});
module.exports.booksTable = r.db('library').table('books');
module.exports.authorsTable = r.db('library').table('authors');
