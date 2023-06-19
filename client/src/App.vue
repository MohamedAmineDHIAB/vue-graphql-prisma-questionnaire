<template>
  <div id="app">
    <h1>Foxbase GmbH</h1>
    <Question />
  </div>
</template>

<script lang="ts">
import Question from './components/Question.vue';

export default {
  name: 'App',
  components: {
    Question,
  },
};
</script>

