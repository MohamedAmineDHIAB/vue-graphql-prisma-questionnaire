import ApolloClient, { gql } from 'apollo-boost';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const apolloClient = new ApolloClient({
    uri: BACKEND_URI,
});

export interface FetchQuestionResponse {
    response?: {
        title: string;
        type: string;
        options: string[];
        id: number;
    };
    message?: string;
}

const fetchQuestionAPI = (depth: number = 1): Promise<FetchQuestionResponse> => {
    return new Promise<FetchQuestionResponse>(async (resolve, reject) => {

        const Query = gql`
            query searchQuestion($depth: Int!) {
                searchQuestion(depth: $depth) {
                    title
                    type
                    options
                    id
                }
            }
        `;

        try {
            const rawResponse = await apolloClient.query({
                query: Query,
                variables: {
                    depth: depth,
                },
            });

            const response = rawResponse.data.searchQuestion[0];
            resolve({ response });
        } catch (error: any) {
            console.error('Query Error:', error.message);
            const message = error.message.replace('GraphQL error: ', '') as string;
            reject({ message });
        }
    });
}
export default fetchQuestionAPI;

