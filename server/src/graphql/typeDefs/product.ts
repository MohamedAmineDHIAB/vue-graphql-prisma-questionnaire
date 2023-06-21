
const typeDefs = `#graphql
    scalar Date
    type Product {
        id: Int
        name: String
        description: String
        price: Float
        image: String
        answers_vector: [Float]
    }
    type Query {
        searchProduct(id: Int): Product!
        getRecommendations(top_k: Int): [Product!]!
    }


`;

export default typeDefs;