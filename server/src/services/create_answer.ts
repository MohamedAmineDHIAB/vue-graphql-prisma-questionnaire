import { GraphQLError } from 'graphql';
import { PrismaClient } from '@prisma/client';

const createAnswerPrisma = async (answer: string[], questionId: number, depth: number, prisma: PrismaClient) => {
    // check if the answer is one of the options of the question
    const question = await prisma.questions.findMany({
        where: {
            id: questionId,
            depth: depth,
        },
    });
    // if no question is found, throw an error
    if (question.length === 0) {
        const ErrorMsg = "The Question you are trying to answer does not exist...";
        throw new GraphQLError(ErrorMsg, {
            extensions: { code: 404 },
        });
    }
    const options = question[0].options;
    const validAnswer = answer.every((val) => options.includes(val));
    if (!validAnswer) {
        const ErrorMsg = "Answer is not valid...";
        throw new GraphQLError(ErrorMsg, {
            extensions: { code: 402 },
        });
    }
    else {
        // check if the specific depth has an answer then update the answer otherwise create a new answer
        const previousAnswer = await prisma.answers.findMany({
            where: {
                depth: depth,
            },
        });

        if (previousAnswer.length > 0) {
            const newAnswer = await prisma.answers.update({
                where: {
                    depth: previousAnswer[0].depth,
                },
                data: {
                    answer: answer,
                    questionId: questionId,
                },
            });
            return newAnswer;
        }
        else {
            const newAnswer = await prisma.answers.create({
                data: {
                    questionId: questionId,
                    answer: answer,
                    depth: depth,
                },
            });
            return newAnswer;
        }
    }

};

export default createAnswerPrisma;