
const typeDefs = `#graphql
    scalar Date
    type Question {
        id: Int
        title: String!
        type: String!
        options: [String!]!
        children: [String!]
        previous_answers: [String!]!
        createdAt: Date!
    }
    type Query {
        searchQuestion(id: Int): [Question!]!
    }
        


`;

export default typeDefs;