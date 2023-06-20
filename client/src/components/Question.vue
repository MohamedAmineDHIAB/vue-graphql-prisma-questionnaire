<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="isError">An error occured... {{ error.message }}</div>
        <div v-else>
            <h2>{{ question.title }}?</h2>
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
export default {
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Object,
            default: () => ({
                message: '',
            }),
        },
        isError: {
            type: Boolean,
            default: false,
        },
        question: {
            type: Object,
            default: () => ({
                title: '',
                type: '',
                options: [],
            }),
        },
    },
};
</script>
