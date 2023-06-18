import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        searchQuestion: async (
            _: any,
            { id }: { id: number },
        ) => {

            // search for the previous question id where it's children contains the title of the current question
            const currentQuestion = await prisma.questions.findMany({
                where: {
                    id: id,
                },
            });
            const currentTitle = currentQuestion[0].title;
            const previousQuestion = await prisma.questions.findMany({
                where: {
                    children: {
                        has: currentTitle,
                    },
                },
            });
            // if no previous question is found, return the current question
            if (previousQuestion.length === 0) {
                return currentQuestion;
            }
            else {
                // check if the previous question has been answered
                const previousAnswer = await prisma.answers.findMany({
                    where: {
                        questionId: previousQuestion[0].id,
                    },
                });
                // if the previous question has been answered, return the current question
                if (previousAnswer.length > 0) {
                    return currentQuestion;
                }
                // if the previous question has not been answered, return an error with status code 402
                else {
                    const ErrorMsg = "Previous question has not been answered...";
                    throw new GraphQLError(ErrorMsg, {
                        extensions: { code: 402 },
                    });

                }
            }

        }
    },
};

export default resolvers;