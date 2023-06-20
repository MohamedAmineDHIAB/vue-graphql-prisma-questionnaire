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
