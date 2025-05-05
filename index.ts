import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { config } from './config';
import typeDefs from './graphql/typedefs/typedefs';
import resolvers from './graphql/resolvers/resolvers';
import { ApolloServer } from 'apollo-server-express';

dotenv.config({ path: '.env'});

mongoose.connect(config.connectionString, {
}).then(() => {
  console.log("DB Coonected")
})

const app: express.Application = express();
const port = 3000;

let server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers: [resolvers]
})

const startServer = async () => {
  await server.start();
  server.applyMiddleware({app})
  console.log("Server started!");


app.listen(port, () => console.log(`Node Graphql API listening on port ${port}!`));
};

startServer();
