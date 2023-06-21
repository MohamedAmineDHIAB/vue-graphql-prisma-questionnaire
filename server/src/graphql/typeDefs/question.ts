
const typeDefs = `#graphql
    scalar Date
    type Question {
        id: Int
        title: String!
        type: String!
        options: [String!]
        children: [String!]
        previous_answer: [String!]
        depth : Int!
        last_question: Boolean
        createdAt: Date!
    }
    type Query {
        searchQuestion(depth: Int): [Question!]!
    }
        


`;

export default typeDefs;