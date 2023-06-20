import { GraphQLError } from "graphql";
import searchQuestionPrisma from "../../services/search_question.ts";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const resolvers = {
    Query: {
        searchQuestion: async (
            _: any,
            { depth }: { depth: number },
        ) => {
            const currentQuestion = await searchQuestionPrisma(depth, prisma);
            return currentQuestion;

        }

    }
};

export default resolvers;