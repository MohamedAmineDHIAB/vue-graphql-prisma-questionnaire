import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import ApolloClient from 'apollo-boost';
import './style.css'
import App from './App.vue'

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

const apolloClient = new ApolloClient({
    uri: BACKEND_URI,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})

app.mount('#app');
