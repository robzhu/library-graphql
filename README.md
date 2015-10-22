# library-graphql
The Library API example re-implemented using GraphQL

1. Make sure http://rethinkdb resolves to rethinkdb, or change it in db.js
2. In RethinkDB, create a database called "library"
3. In RethinkDB, create tables "books" and "authors"

```
npm install -g babel
npm install
babel-node index.js
```

Navigate to http://localhost:3000/graphql

Try a query like so:

{
  books{
    id
    title
    author{
      lastName
    }
  }
}
