<template>
    <div>
        <h1>Foxbase GmbH</h1>
        <button @click="redirectToQuestionnaire">Go to Questionnaire</button>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        redirectToQuestionnaire() {
            this.$router.push('/questionnaire#1');
        },
    },
};
</script>