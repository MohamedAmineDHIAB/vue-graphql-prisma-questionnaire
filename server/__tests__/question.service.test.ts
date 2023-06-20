import searchQuestionPrisma from '../src/services/search_question.ts';
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

describe('searching for a question', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call prisma.questions.findMany 1 time and return the correct question', async () => {
        const mockQuestion = {
            id: 1,
            title: 'Question 1',
            children: ['Question 2'],
            type: 'radio',
            options: ['Option 1', 'Option 2'],
            previous_answer: [],
            depth: 1,
            createdAt: new Date(),
        };

        prismaMock.questions.findMany.mockResolvedValue([mockQuestion]);

        const result = await searchQuestionPrisma(1, prismaMock);

        expect(prismaMock.questions.findMany).toHaveBeenCalledWith({
            where: {
                depth: 1,
            },
        });
        expect(prismaMock.questions.findMany).toHaveBeenCalledTimes(1);
        expect(result).toEqual([mockQuestion]);
    });
});
