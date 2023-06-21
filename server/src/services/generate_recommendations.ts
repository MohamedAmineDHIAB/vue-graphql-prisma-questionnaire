import { GraphQLError } from 'graphql';
import { PrismaClient } from '@prisma/client';

const generateRecommendationsPrisma = async (prisma: PrismaClient, top_k: number) => {

    // find all questions and order them by id
    const questions = await prisma.questions.findMany({
        orderBy: {
            id: 'asc',
        },
    });
    // get all answers
    const answers = await prisma.answers.findMany();
    // construct the answers vector
    let answersVector: any = [];
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const answer = answers.find((answer) => answer.questionId === question.id);
        switch (question.type) {
            case "range":
                answersVector.push(answer ? parseFloat(answer.answer[0]) : 0);
                break;
            default:
                // push a vector of 0 everywhere and 1 where the answer is of size question.options
                answersVector = answersVector.concat(question.options.map((option) => answer ? answer.answer.includes(option) ? 1 : 0 : 0));
                break;
        }


    }
    // get all the answers_vector of all the products and store them in a matrix
    const productsVectors = await prisma.products.findMany({
        select: {
            answers_vector: true,
        },
        orderBy: {
            id: 'asc',
        },
    });
    const productsMatrix = productsVectors.map((product) => product.answers_vector);
    // return the indexes of the top_k products (euclidean distance)
    const recommendationsIdx = calculateRecommendations(answersVector, productsMatrix, top_k);

    // get the products from the products table using the indexes
    const recommendations = await prisma.products.findMany({
        where: {
            id: {
                in: recommendationsIdx
            }
        }
    });
    return recommendations;
}

const calculateRecommendations = (answersVector: any[], productsMatrix: any[], top_k: number) => {
    const euclideanDistances: number[] = [];
    for (let i = 0; i < productsMatrix.length; i++) {
        const productAnswersVector = productsMatrix[i];
        const distance = calculateEuclideanDistance(answersVector, productAnswersVector);
        euclideanDistances.push(distance);
    }
    const sortedIndexes = euclideanDistances
        .map((distance, index) => ({ distance, index }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, top_k)
        .map((item) => item.index);
    return sortedIndexes;
}

const calculateEuclideanDistance = (vector1: any[], vector2: any[]) => {
    let sum = 0;
    for (let i = 0; i < vector1.length; i++) {
        const diff = vector1[i] - vector2[i];
        sum += diff * diff;
    }
    return Math.sqrt(sum);
}

export default generateRecommendationsPrisma;