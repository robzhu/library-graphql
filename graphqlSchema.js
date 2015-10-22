import * as _ from 'lodash';
import uuidbase62 from 'uuid-base62';
import bookSchema from './bookSchema';
import authorSchema from './authorSchema';

import {
  GraphQLInt, GraphQLFloat, GraphQLString, GraphQLList, GraphQLObjectType,
  GraphQLEnumType, GraphQLNonNull, GraphQLSchema, graphql
} from 'graphql';

const Query = new GraphQLObjectType({
  name: "RootQueries",
  description: "Root Queries for the library objects",
  fields: () => ({
    books: bookSchema.rootQuery,
    authors: authorSchema.rootQuery,
  })
});

const Mutation = new GraphQLObjectType({
  name: "LibraryMutations",
  description: "Mutations of the library objects",
  fields: () => ({
    addBook: bookSchema.addBookMutation,
    addAuthor: authorSchema.addAuthorMutation,
  })
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;
