import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        searchQuestions: async (
            _: any,
            { keyword }: { keyword: string },
        ) => {
            const questions = await prisma.questions.findMany({
                where: {
                    question: {
                        contains: keyword,
                    },
                },
            });

            return questions;
        }
    },
};

export default resolvers;