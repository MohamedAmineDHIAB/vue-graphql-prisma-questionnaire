import createAnswerPrisma from '../src/services/create_answer.ts';
import searchAnswerPrisma from '../src/services/search_answer.ts';
import { prismaMock } from '../src/utils/singleton.ts';

// Mock the necessary Prisma methods
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        questions: {
            findMany: jest.fn(),
        },
        answers: {
            findMany: jest.fn(),
        },
    })),
}));

describe('searching for an answer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call prisma.answer.findMany 1 time and return the correct answer', async () => {
        const mockAnswer = {
            depth: 1,
            questionId: 1,
            answer: ['Answer 1'],
            createdAt: new Date(),
        };

        prismaMock.answers.findMany.mockResolvedValue([mockAnswer]);

        const result = await searchAnswerPrisma(1, prismaMock);

        expect(prismaMock.answers.findMany).toHaveBeenCalledWith({
            where: {
                depth: 1,
            },
        });
        expect(prismaMock.answers.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual([mockAnswer]);
    });
});
describe('trying to create an answer', () => {

    test('should call prisma.questions.findMany 1 time aand not find a question for the provided questionId', async () => {
        const mockAnswer = {
            depth: 1,
            questionId: 0,
            answer: ['Answer 1'],
            createdAt: new Date(),
        };
        prismaMock.questions.findMany.mockResolvedValue([]);
        try {
            const result = await createAnswerPrisma(mockAnswer.answer, mockAnswer.questionId, mockAnswer.depth, prismaMock);
        }
        catch (error) {
            expect(prismaMock.questions.findMany).toHaveBeenCalledWith({
                where: {
                    id: mockAnswer.questionId,
                    depth: mockAnswer.depth,
                },
            });
            // expect to throw a 404 error with the message "The Question you are trying to answer to does not exist..."
            expect(error.message).toEqual("The Question you are trying to answer does not exist...");
            expect(error.extensions.code).toEqual(404);
        }

    });
});

