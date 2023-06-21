
const typeDefs = `#graphql
    scalar Date
    type Answer {
        depth: Int
        questionId: String!
        answer: [String!]
        createdAt: Date!
    }
    type Query {
        searchAnswer(depth: Int): [Answer!]!
    }
    type Mutation {
        createAnswer(questionId: Int, answer: [String!], depth: Int): Answer!
    }

`;

export default typeDefs;