// import { ApolloServer, gql } from "apollo-server-express";
// import express from "express";
import { GraphQLServer, Options } from "graphql-yoga";
import morgan from "morgan";

import cache from "./cache";

// The GraphQL schema
const typeDefs = `
    type User {
        id: Int
        md5: String
        sha256: String
        sha512: String
    }

    type Query {
        hello: String
        now: String
        users(listId: Int): [User]
    }
`;

interface UsersArgs {
    listId: number;
}

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        hello: () => "world",
        now: () => (new Date()).toISOString(),
        users: async (_: any, { listId }: UsersArgs) => {
            try {
                const key = `test_${listId}`;
                const value = await cache.getValue(key);
                return value.users;
            } catch (err) {
                // tslint:disable-next-line:no-console
                console.log(err);
                return [];
            }
        },
    },
};

const server = new GraphQLServer({
    typeDefs,
    resolvers,
});

// const app = express();
// app.use(morgan("dev"));
// server.applyMiddleware({ app });
// app.listen(port, () => {
//     // tslint:disable-next-line:no-console
//     console.log(`start server localhost:${port}`);
// });

server.express.use(morgan("dev"));

const port = 4000;
const endpoint = "/graphql";

const options: Options = {
    port,
    endpoint,
    playground: "/playground",
};
server.start(options, () => {
    // tslint:disable-next-line:no-console
    console.log(`start server localhost:${port}`);
});
