// test that the server is running and returns questions
import createApolloServer from '../../src/utils/create_server';
// we'll use apollo client to test our server
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';
// import prisma client to check the results sent by the server
import { PrismaClient } from '@prisma/client';

// the question depth we'll use for our test (first question)
const DEPTH = 1;

// this is the query for our test
const queryData = {
    query: gql`query searchQuestion($depth: Int) {
    searchQuestion(depth: $depth){
        depth
        title
    }
  }`,
    variables: { depth: DEPTH },
};

describe('End-to-End Testing for Question Search', () => {
    let server: any;
    let url: any;
    let client: any;
    let prisma: PrismaClient;

    // before the tests we spin up a new Apollo Server
    beforeAll(async () => {
        const PORT = 8000;
        ({ server, url } = await createApolloServer(PORT));
        // Create an Apollo Client instance
        client = new ApolloClient({
            uri: url,
            cache: new InMemoryCache(),
        });
        // Create a new Prisma Client instance
        prisma = new PrismaClient();
    });

    // after the tests we'll stop the server
    afterAll(async () => {
        await server?.stop();
        await prisma.$disconnect();
    });

    it('should return a question with valid details', async () => {
        // get the real data from the prisma client
        const realData = await prisma.questions.findMany({
            where: { depth: DEPTH },
        });
        // send our request to the url of the test server
        const response = await client.query(queryData);
        // extract the data from the response
        const { data } = response;
        // extract the searchQuestion from the data
        const searchQuestion = data.searchQuestion[0];
        // Assert the expected result
        expect(searchQuestion).toBeDefined();
        expect(searchQuestion.depth).toBe(DEPTH);
        expect(searchQuestion.title).toBe(realData[0].title);
    });
    it('should return an ApolloError if the question is not found', async () => {
        try {
            // send our request to the url of the test server
            await client.query({
                query: gql`query searchQuestion($depth: Int) {
                    searchQuestion(depth: $depth){
                        depth
                        title
                    }
                }`,
                variables: { depth: 0 },
            });
        } catch (error) {
            // get error message
            const errorMessage = error.graphQLErrors[0].message;
            // Assert the expected message
            expect(errorMessage).toBe('No Question was found...');
            // get error code
            const errorCode = error.graphQLErrors[0].extensions.code;
            // Assert the expected code
            expect(errorCode).toBe(404);
        }
    }
    );
});