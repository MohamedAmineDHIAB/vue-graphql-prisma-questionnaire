
const typeDefs = `#graphql
    scalar Date
    type Answer {
        id: Int
        questionId: String!
        answer: [String!]
        createdAt: Date!
    }
    type Query {
        searchAnswer(id: Int): [Answer!]!
    }
    type Mutation {
        createAnswer(questionId: Int, answer: [String!]): Answer!
    }

`;

export default typeDefs;