<template>
    <div>
        <Question :loading="loading" :error="error" :isError="isError" :question="question" />
        <!-- if there is an error render a button "restart the questionnaire" -->
        <button v-if="isError" @click="handleRestart">Restart the questionnaire</button>
        <button v-if="(!isError && depth > 1)" @click="handleBack">Back</button>
        <button v-if="!isError" @click="handleNext">Next</button>
    </div>
</template>

<script lang="ts">
import Question from '../components/Question.vue';
import ApolloClient, { gql } from 'apollo-boost';
import getDepthFromUrl from '../utils/get_depth';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const apolloClient = new ApolloClient({
    uri: BACKEND_URI,
});

export default {
    components: {
        Question,
    },
    data() {
        return {
            loading: true,
            error: {
                message: '',
            },
            isError: false,
            question: {
                title: '',
                type: '',
                options: [],
            },
            depth: 1,
        };
    },
    mounted() {
        this.depth = this.getDepthFromUrl();
        if (this.depth) {
            this.fetchQuestion(this.depth);
        } else {
            console.error('Depth parameter not found in URL');
            this.error.message = 'bad URL';
            this.isError = true;
        }
    },
    methods: {
        fetchQuestion(depth: number = 1) {
            this.loading = true;
            this.isError = false;
            this.error = {
                message: '',
            };
            const Query = gql`
                query searchQuestion($depth: Int!) {
                    searchQuestion(depth: $depth) {
                        title
                        type
                        options
                    }
                }
            `;
            apolloClient
                .query({
                    query: Query,
                    variables: {
                        depth: depth,
                    },
                })
                .then((result) => {
                    this.question = result.data.searchQuestion[0];
                    this.loading = false;
                })
                .catch((error) => {
                    this.isError = true;
                    console.error('Query Error:', error.message);
                    error.message = error.message.replace('GraphQL error: ', '');
                    this.error = error;
                    this.loading = false;
                });
        },
        handleNext() {
            this.depth += 1;
            this.$router.push(`/questionnaire#${this.depth}`);
            this.fetchQuestion(this.depth);
        },
        handleBack() {
            this.depth -= 1;
            this.$router.push(`/questionnaire#${this.depth}`);
            this.fetchQuestion(this.depth);
        },
        handleRestart() {
            this.depth = 1;
            this.$router.push(`/questionnaire#${this.depth}`);
            this.fetchQuestion(this.depth);
        },
        getDepthFromUrl,
    },
};
</script>
