import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import searchAnswerPrisma from '../../services/search_answer.ts';
import createAnswerPrisma from '../../services/create_answer.ts';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        searchAnswer: async (
            _: any,
            { depth }: { depth: number },
        ) => {
            const answers = await searchAnswerPrisma(depth, prisma);
            return answers;
        }
    },
    Mutation: {
        createAnswer: async (
            _: any,
            { questionId, answer }: { questionId: number, answer: string[] },
        ) => {
            const newAnswer = await createAnswerPrisma(answer, questionId, prisma);
            return newAnswer;
        }
    }

};

export default resolvers;