<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="is_error">Error: {{ error.message }}</div>
        <div v-else>
            <h2>{{ question.title }} ?</h2>
            <!-- render based on question.type -->
            <div>
                <div v-for="(option, index) in question.options" :key="index">
                    <input :type="question.type" :value="option" :id="option" :name="question.title" />
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

// const Query = gql`
//   query searchQuestion {
//     searchQuestion(depth: 1) {
//       title
//       type
//       options
//     }
//   }
// `;

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
        const depth = this.getDepthFromUrl();
        if (depth) {
            this.fetchQuestion(depth);
        } else {
            console.error('Depth parameter not found in URL');
        }
    },
    methods: {
        fetchQuestion(depth: number = 1) {
            this.loading = true;
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
        }, getDepthFromUrl() {
            const depthMatch = window.location.hash.match(/#(\d+)/);
            if (depthMatch && depthMatch[1]) {
                return parseInt(depthMatch[1]);
            }
            return null;
        },
    },
};
</script>