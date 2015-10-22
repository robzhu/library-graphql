import * as _ from 'lodash';
import uuidbase62 from 'uuid-base62';
import async from 'asyncawait/async';
import await from 'asyncawait/await';

import db from '../db';

var _getAllBooksAsync = async( function(source, args){
  return await( db.booksTable.run() );
});

var _getAuthorOfBookAsync = async( function(book){
  console.log(book);
  return await( db.authorsTable.get(book.authorId).run() );
});

var _addBookAsync = async( function(source, args){
  var author = await( db.authorsTable.get(args.authorId).run() );
  if(!author){
    var msg = "authorId does not refer to a valid author in the system";
    console.log(msg);
    throw msg;
  }

  let book = _.clone(args);
  book.id = uuidbase62.v4();
  return db.booksTable.insert(book, {returnChanges: true}).run().then(function(result){
    var newBook = result.changes[0].new_val;
    console.log('new book added:');
    console.log(newBook);
    return newBook;
  });
});

module.exports.getAllBooksAsync = _getAllBooksAsync;
module.exports.getAuthorOfBookAsync = _getAuthorOfBookAsync;
module.exports.addBookAsync = _addBookAsync;
