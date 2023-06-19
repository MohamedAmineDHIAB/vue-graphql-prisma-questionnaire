<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="is_error">Error: {{ error.message }}</div>
        <div v-else>
            <h2>{{ question.title }} ?</h2>
            <!-- render based on question.type -->
            <div v-if="question.type === 'radio'">
                <div v-for="(option, index) in question.options" :key="index">
                    <input type="radio" :value="option" :id="option" :name="question.title" />
                    <label :for="option">{{ option }}</label>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import ApolloClient, { gql } from 'apollo-boost';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const apolloClient = new ApolloClient({
    uri: BACKEND_URI,
});

const Query = gql`
  query searchQuestion {
    searchQuestion(id: 1) {
      title
      type
      options
    }
  }
`;

export default {
    data() {
        return {
            loading: false,
            is_error: false,
            error: {
                message: '',
            },
            question: {
                title: '',
                type: '',
                options: [],
            },
        };
    },
    mounted() {
        this.fetchQuestion();
    },
    methods: {
        fetchQuestion() {
            this.loading = true;

            apolloClient
                .query({
                    query: Query,
                })
                .then((result) => {
                    console.log('Query Result:', result)
                    this.question = result.data.searchQuestion[0];
                    this.loading = false;
                })
                .catch((error) => {
                    this.is_error = true;
                    console.error('Query Error:', error);
                    this.error = error;
                    this.loading = false;
                });
        },
    },
};
</script>