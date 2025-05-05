import * as express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { config } from "./config";
import typeDefs from "./graphql/typedefs/typedefs";
import resolvers from "./graphql/resolvers/resolvers";
import { ApolloServer } from "apollo-server-express";
import { errors } from "undici-types";

dotenv.config({ path: ".env" });

if (!config.connectionString) {
  console.error("DATABASE CONNECTION STRING MISSING!");
  process.exit(1);
}

mongoose
  .connect(config.connectionString, {})
  .then(() => {
    console.log("🚀 Database successfully connected!");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

const app: express.Application = express();
const port = 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  try {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(port, () =>
      console.log(`⚡️ Server ready to connect on port ${port}!`)
    );
  } catch {
    console.error("❌ Failed to start server", errors)
    process.exit(1)
  }
};

startServer();
