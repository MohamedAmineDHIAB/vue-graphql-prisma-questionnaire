import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "../graphql/typeDefs/index.ts";
import resolvers from "../graphql/resolvers/index.ts";
import { makeExecutableSchema } from "@graphql-tools/schema";


async function createApolloServer(port: number) {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    const server = new ApolloServer({
        schema
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: port },
    });
    return { server, url };
}

export default createApolloServer;