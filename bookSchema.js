import * as _ from 'lodash';
import db from './db';
import bookService from './services/bookService';
import authorSchema from './authorSchema';

import {
  GraphQLInt, GraphQLFloat, GraphQLString, GraphQLList, GraphQLObjectType,
  GraphQLEnumType, GraphQLNonNull, GraphQLSchema, graphql
} from 'graphql';

const Book = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id:       {type: new GraphQLNonNull(GraphQLString)},
    authorId: {type: new GraphQLNonNull(GraphQLString)},
    title:    {type: new GraphQLNonNull(GraphQLString)},
    isbn:     {type: new GraphQLNonNull(GraphQLString)},
    author: {
      type: authorSchema.Author,
      resolve: function(book){
        return bookService.getAuthorOfBookAsync(book).then(returnResult);
      }
    }
  })
});

var _rootQuery = {
  type: new GraphQLList(Book),
  resolve(rootValue, args){
    return bookService.getAllBooksAsync(rootValue, args).then(returnResult);
  }
};

var returnResult = function(result){ return result; };

var _addBookMutation = {
  type: Book,
  description: "Adds a book",
  args:{
    authorId: {type: new GraphQLNonNull(GraphQLString)},
    title:    {type: new GraphQLNonNull(GraphQLString)},
    isbn:     {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve(source, args){
    return bookService.addBookAsync(source, args).then(returnResult);
  }
};

module.exports.Book = Book;

module.exports.rootQuery = _rootQuery;

module.exports.addBookMutation = _addBookMutation;
