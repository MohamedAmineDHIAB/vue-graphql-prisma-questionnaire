<template>
    <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="isError">An error occured... {{ error.message }}</div>
        <div v-else>
            <h2>{{ question.title }}?</h2>
            <div v-if="question.type == 'range'">
                <div>
                    <input type="range" :min="question.options[0]" :max="question.options[1]" :name="question.title"
                        step="0.5" :value="defaultAnswer[0] || 95" @change="handleOptionSelected" />
                    <label :for="question.title">{{ defaultAnswer[0] || 95 }}</label>
                </div>
            </div>
            <div v-else>
                <div v-for="(option, index) in question.options" :key="index">
                    <input :type="question.type" :value="option" :id="option" :name="question.title"
                        :checked="defaultAnswer.includes(option)" @change="handleOptionSelected" />
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
            default: false,
        },
        error: {
            default: () => ({
                message: '',
            }),
        },
        isError: {
            default: false,
        },
        question: {
            default: () => ({
                title: '',
                type: '',
                options: [] as string[],
            }),
        },
        defaultAnswer: {
            default: () => ([] as string[]),
        },
    },
    methods: {
        handleOptionSelected(event: Event) {
            const selectedOption = (event.target as HTMLInputElement).value;
            this.$emit('optionSelected', selectedOption);
        },
    },
};
</script>
