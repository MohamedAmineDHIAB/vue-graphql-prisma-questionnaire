import { PrismaClient } from "@prisma/client";
import questionsSeeder from "./seeders/questions_seeder.js";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "../graphql/typeDefs/index.js";
import resolvers from "../graphql/resolvers/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";



async function main(prisma: PrismaClient) {
    // await questionsSeeder(prisma);
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    const server = new ApolloServer({
        schema
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);

}

const prisma = new PrismaClient();
main(prisma)



