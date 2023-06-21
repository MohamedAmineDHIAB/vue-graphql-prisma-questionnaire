import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import generateRecommendationsPrisma from '../../services/generate_recommendations.ts';

const prisma = new PrismaClient();

const resolvers = {
    Query: {
        searchProduct: async (
            _: any,
            { id }: { id: number },
        ) => {
            const product = await prisma.products.findMany({
                where: {
                    id
                }
            });
            return product[0];
        },
        getRecommendations: async (
            _: any,
            { top_k }: { top_k: number },
        ) => {
            const recommendations = await generateRecommendationsPrisma(prisma, top_k);
            return recommendations;
        }

    },
}

export default resolvers;