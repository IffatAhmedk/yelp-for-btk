// import { ApolloServer } from "apollo-server-express";
import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        id: ID!, 
        name: String!
    }

    type Query{
        users: [User]!,
        user(id: ID!): User!
    }

    type Mutation{
        addUser(name: String!, email: String!, age: Int!): ID!,
        updateUser(id: ID!, name: String, email: String, age: Int): User,
        deleteUser(id: ID!): Boolean!,

    }
`
export default typeDefs