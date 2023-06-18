
const typeDefs = `#graphql
    scalar Date
    type Question {
        id: ID!
        question: String!
        type: String!
        options: [String!]!
        children: [String!]!
        previous_answers: [String!]!
        createdAt: Date!
    }
    type Query {
        searchQuestions(keyword: String!): [Question!]!
    }
        


`;

export default typeDefs;