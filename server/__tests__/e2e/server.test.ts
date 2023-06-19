// test that the server is running on port 8000 and returns a 200 status code
import createApolloServer from '../../src/create_server';
// we'll use apollo client to test our server
import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';
// import prisma client to check the results sent by the server
import { PrismaClient } from '@prisma/client';

// the question id we'll use for our test 
const ID = 1;

// this is the query for our test
const queryData = {
    query: gql`query searchQuestion($id: Int) {
    searchQuestion(id: $id){
        id
        title
    }
  }`,
    variables: { id: ID },
};

describe('e2e demo', () => {
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

    it('query question', async () => {
        // get the real data from the prisma client
        const realData = await prisma.questions.findUnique({
            where: { id: ID },
        });
        // send our request to the url of the test server
        const response = await client.query(queryData);
        // extract the data from the response
        const { data } = response;
        // extract the searchQuestion from the data
        const searchQuestion = data.searchQuestion[0];
        // Assert the expected result
        expect(searchQuestion).toBeDefined();
        expect(searchQuestion.id).toBe(ID);
        expect(searchQuestion.title).toBe(realData.title);
    });
});