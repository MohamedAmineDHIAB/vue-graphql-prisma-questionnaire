import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import ApolloClient from 'apollo-boost';
import App from './App.vue'



const apolloClient = new ApolloClient({
    uri: import.meta.env.VITE_BACKEND_URI,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})

app.mount('#app');
