import ApolloClient, { gql } from 'apollo-boost';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const apolloClient = new ApolloClient({
    uri: BACKEND_URI,
});

export interface PostAnswerResponse {
    response?: {
        answer: string[];
    };
    message?: string;
}

const postAnswerAPI = (answer: string[], depth: number = 1, questionId: number): Promise<PostAnswerResponse> => {
    return new Promise<PostAnswerResponse>(async (resolve, reject) => {
        const Query = gql`
            mutation CreateAnswer($questionId: Int, $answer: [String!], $depth: Int) {
                createAnswer(questionId: $questionId, answer: $answer, depth: $depth) {
                    answer
                }
            }
        `;
        try {
            const rawResponse = await apolloClient.mutate({
                mutation: Query,
                variables: {
                    depth: depth,
                    answer: answer,
                    questionId: questionId,
                },
            });

            const response = rawResponse.data.createAnswer;
            resolve({ response });
        } catch (error: any) {
            console.error('Query Error:', error.message);
            const message = error.message.replace('GraphQL error: ', '') as string;
            reject({ message });
        }
    });
}
export default postAnswerAPI;

