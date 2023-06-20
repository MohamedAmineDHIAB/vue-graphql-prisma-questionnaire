<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Question from './components/Question.vue';
import Home from './views/Home.vue';

export default {
  name: 'App',
  components: {
    Question,
    Home,
  },
};
</script>

