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
            console.log(import.meta.env.VITE_QUESTIONNAIRE_ROUTE);
            // this.$router.push('/questionnaire');
        },
    },
};
</script>