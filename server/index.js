import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';

// Define a GraphQL schema
//   //GraphQL types 
const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    hello: String
    posts: [Post]
    post(id: ID!): Post
  }
`);



// Dummy data
const posts = [
  { id: '1', title: 'My First Post', content: 'This is the content of my first post.' },
  { id: '2', title: 'Learning GraphQL', content: 'GraphQL is a powerful query language for your API.' },
];

// Define resolver functions
const root = {
  hello: () => {
    console.log('hello query called');
    return 'Hello, GraphQL!';
  },
  posts: () => {
    console.log('posts query called');
    return posts;
  },
  post: ({ id }) => {
    console.log(`post query called with id: ${id}`);
    return posts.find(post => post.id === id);
  },
};


// const root = {
//   hello: () => 'Hello, GraphQL!',
//   posts: () => posts,
//   post: ({ id }) => posts.find(post => post.id === id),
// };


//this is like this in REST API :


// app.get('/hello', (req, res) => res.send('Hello, GraphQL!'));
// app.get('/posts', (req, res) => res.json(posts));
// app.get('/post/:id', (req, res) => res.json(posts.find(...)));



const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enables the GraphiQL IDE
  })
);

// schema → Tells GraphQL what types & queries exist.
// rootValue → Links queries to their resolver functions.
// graphiql: true → Gives you a built-in GraphQL playground to test queries.

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.listen(4000, () => {
  console.log('GraphQL server running at http://localhost:4000/graphql');
});
