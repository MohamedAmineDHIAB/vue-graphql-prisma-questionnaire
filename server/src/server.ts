import { PrismaClient } from "@prisma/client";
import questionsSeeder from "./seeders/questions_seeder.js";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "../graphql/typeDefs/index.js";
import resolvers from "../graphql/resolvers/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import dotenv from "dotenv";


export async function createApolloServer(port: number) {
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


async function main(prisma: PrismaClient) {
    if (process.env.NODE_ENV === "production") {
        console.log("Seeding the database...");
        await questionsSeeder(prisma);
    }
    const PORT = Number(process.env.PORT) || 4000;

    const { server, url } = await createApolloServer(PORT);
    console.log(`🚀  Server ready at: ${url}`);

}

const prisma = new PrismaClient();
dotenv.config();
main(prisma)



