import { GraphQLError } from 'graphql';
import { PrismaClient } from '@prisma/client';

const createAnswerPrisma = async (answer: string[], questionId: number, prisma: PrismaClient) => {
    // check if the answer is one of the options of the question
    const question = await prisma.questions.findMany({
        where: {
            id: questionId,
        },
    });
    const options = question[0].options;
    const validAnswer = answer.every((val) => options.includes(val));
    if (!validAnswer) {
        const ErrorMsg = "Answer is not valid...";
        throw new GraphQLError(ErrorMsg, {
            extensions: { code: 400 },
        });
    }
    else {
        // check if the question has been answered then update the answer otherwise create a new answer
        const previousAnswer = await prisma.answers.findMany({
            where: {
                questionId: questionId,
            },
        });

        if (previousAnswer.length > 0) {
            const newAnswer = await prisma.answers.update({
                where: {
                    depth: previousAnswer[0].depth,
                },
                data: {
                    answer: answer,
                },
            });
            return newAnswer;
        }
        else {
            const newAnswer = await prisma.answers.create({
                data: {
                    questionId: questionId,
                    answer: answer,
                },
            });
            return newAnswer;
        }
    }

};

export default createAnswerPrisma;