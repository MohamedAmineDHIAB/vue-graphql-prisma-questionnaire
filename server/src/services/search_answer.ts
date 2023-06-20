import { PrismaClient } from '@prisma/client';

const searchAnswerPrisma = async (depth: number, prisma: PrismaClient) => {
    const answers = prisma.answers.findMany({
        where: {
            depth: depth,
        },
    });
    return answers;

};

export default searchAnswerPrisma;