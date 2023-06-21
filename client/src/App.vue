<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Questionnaire from './views/Questionnaire.vue';
import Home from './views/Home.vue';
import Recommendations from './views/Recommendations.vue';

export default {
  name: 'App',
  components: {
    Questionnaire,
    Home,
    Recommendations
  },
};
</script>

