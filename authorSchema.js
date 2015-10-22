import * as _ from 'lodash';
import uuidbase62 from 'uuid-base62';
import db from './db';
import bookSchema from './bookSchema';

import {
  GraphQLInt, GraphQLFloat, GraphQLString, GraphQLList, GraphQLObjectType,
  GraphQLEnumType, GraphQLNonNull, GraphQLSchema, graphql
} from 'graphql';

const Author = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id:         {type: new GraphQLNonNull(GraphQLString)},
    lastName:   {type: new GraphQLNonNull(GraphQLString)},
    firstName:  {type: new GraphQLNonNull(GraphQLString)},
  })
});

var _rootQuery = {
  type: new GraphQLList(Author),
  args:{
    id: {type: GraphQLString},
  },
  resolve(rootValue, args){
    if(args.id){
      return db.authorsTable.filter({id:args.id}).run().then(function(result){
        return result;
      });
    } else {
      return db.authorsTable.run().then(function(result){
        return result;
      });
    }
  }
};

var _addAuthorMutation = {
  type: Author,
  description: "Adds an author",
  args:{
    lastName:   {type: new GraphQLNonNull(GraphQLString)},
    firstName:  {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve(source, args){
    let author = _.clone(args);
    author.id = uuidbase62.v4();
    return db.authorsTable.insert(author, {returnChanges: true}).run().then(function(result){
      return result.changes[0].new_val;
    });
  }
};

module.exports.Author = Author;

module.exports.rootQuery = _rootQuery;

module.exports.addAuthorMutation = _addAuthorMutation;
