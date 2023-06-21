import { GraphQLError } from 'graphql';
import { PrismaClient, Prisma } from '@prisma/client';

const searchQuestionPrisma = async (depth: number, prisma: PrismaClient) => {

    // get the questions for that depth
    const depthQuestions = await prisma.questions.findMany({
        where: {
            depth: depth,
        },
    });

    // if no question is found, return an error with status code 404
    if (depthQuestions.length === 0) {
        const ErrorMsg = "No Question was found...";
        throw new GraphQLError(ErrorMsg, {
            extensions: { code: 404 },
        });
    }

    // if depth is 1, return the question
    if (depth === 1) {
        return depthQuestions;
    }


    // get the answer value of the previous depth
    const previousAnswer = await prisma.answers.findMany({
        select: {
            answer: true,
        },
        where: {
            depth: depth - 1,
        },
    });

    // if the previous depth has no answer throw an error 402 
    if (previousAnswer.length === 0) {
        const ErrorMsg = "Previous question has not been answered...";
        throw new GraphQLError(ErrorMsg, {
            extensions: { code: 402 },
        });
    }
    // based on depthQuestions get the question of the current depth that has a previous answer field either empty array or that matches the previous answer value
    const currentQuestion = depthQuestions.filter((question) => {
        // check if the previous_answer field matches the previous answer value
        const ArrayMatch = previousAnswer[0].answer.every((element) => {
            return (question.previous_answer.includes(element));
        })
        return (question.previous_answer.length === 0 || ArrayMatch);
    });
    return currentQuestion;
};

export default searchQuestionPrisma;