import ApolloClient, { gql } from 'apollo-boost';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const apolloClient = new ApolloClient({
    uri: BACKEND_URI,
});

export interface FetchRecommendationsResponse {
    response: {
        name: string;
        description: string;
        price: number;
        image: string;
        id: number;
    }[];
    message?: string;
}

const fetchRecommendationsAPI = (top_k: number = 1): Promise<FetchRecommendationsResponse> => {
    return new Promise<FetchRecommendationsResponse>(async (resolve, reject) => {

        const Query = gql`
            query GetRecommendations($top_k: Int!) {
                getRecommendations(top_k: $top_k) {
                    name
                    description
                    price
                    image
                    id
                }
            }
        `;

        try {
            const rawResponse = await apolloClient.query({
                query: Query,
                variables: {
                    top_k: top_k,
                },
            });

            const response = rawResponse.data.getRecommendations;
            resolve({ response });
        } catch (error: any) {
            console.error('Query Error:', error.message);
            const message = error.message.replace('GraphQL error: ', '') as string;
            reject({ message });
        }
    });
}
export default fetchRecommendationsAPI;

