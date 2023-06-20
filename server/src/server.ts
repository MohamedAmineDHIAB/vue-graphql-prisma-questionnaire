import { PrismaClient } from "@prisma/client";
import questionsSeeder from "./seeders/questions_seeder.ts";
import createApolloServer from "./utils/create_server.ts";
import dotenv from "dotenv";
dotenv.config();




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
main(prisma)



