import ApolloClient, { gql } from 'apollo-boost';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const apolloClient = new ApolloClient({
    uri: BACKEND_URI,
});

export interface fetchAnswerResponse {
    response?: string[];
    message?: string;
}

const fetchAnswerAPI = (depth: number = 1): Promise<fetchAnswerResponse> => {
    return new Promise<fetchAnswerResponse>(async (resolve, reject) => {
        const Query = gql`
            query SearchAnswer($depth: Int) {
                searchAnswer(depth: $depth) {
                answer
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
            const searchAnswer = rawResponse.data.searchAnswer;
            if (searchAnswer.length === 0) {
                const response = [] as string[];
                resolve({ response });
            }
            const response = searchAnswer[0].answer;
            resolve({ response });
        } catch (error: any) {
            console.error('Query Error:', error.message);
            const message = error.message.replace('GraphQL error: ', '') as string;
            reject({ message });
        }
    });
}
export default fetchAnswerAPI;

