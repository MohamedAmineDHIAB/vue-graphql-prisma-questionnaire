import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import ApolloClient from 'apollo-boost';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css'
import App from './App.vue'
import Home from './views/Home.vue';

// defining the apollo client
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const apolloClient = new ApolloClient({
    uri: BACKEND_URI,
})

// defining the routes
const routes = [
    { path: '/', component: Home },
    { path: '/questionnaire', component: () => import('./views/Questionnaire.vue') },
    { path: '/recommendations', component: () => import('./views/Recommendations.vue') },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})
app.use(router);
app.mount('#app');
