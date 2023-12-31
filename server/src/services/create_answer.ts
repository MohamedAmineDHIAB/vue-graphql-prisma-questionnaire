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
    let validAnswer = false;
    if (question[0].type == "range") {
        validAnswer = answer.length === 1 && parseFloat(answer[0]) >= parseFloat(options[0]) && parseFloat(answer[0]) <= parseFloat(options[1]);
    }
    else {
        validAnswer = answer.every((val) => options.includes(val)) && answer.length > 0;
    }
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
        let newAnswer: any;
        if (previousAnswer.length > 0) {
            newAnswer = await prisma.answers.update({
                where: {
                    depth: previousAnswer[0].depth,
                },
                data: {
                    answer: answer,
                    questionId: questionId,
                },
            });
        }
        else {
            newAnswer = await prisma.answers.create({
                data: {
                    questionId: questionId,
                    answer: answer,
                    depth: depth,
                },
            });
        }
        // delete the answers that are deeper than the current depth
        await prisma.answers.deleteMany({
            where: {
                depth: {
                    gt: depth,
                },
            },
        });
        return newAnswer;


    }

};

export default createAnswerPrisma;