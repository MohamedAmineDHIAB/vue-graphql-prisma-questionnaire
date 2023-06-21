<template>
    <div>
        <h1>
            Our Recommendations
        </h1>
        <div class="input-container">
            <label for="top_k">Type number of shown recommendations: </label>
            <input type="number" v-model="top_k" class="input_topk" />
            <button @click="fetchRecommendations">OK</button>
        </div>
        <div class="recommendations_container">
            <Product v-for="product in products" :key="product.id" :product="product" />
        </div>
    </div>
</template>

<script lang="ts">
import Product from '../components/Product.vue';
import fetchRecommendationsAPI from '../apis/fetch_recommendations';


export default {
    components: {
        Product,
    },
    data() {
        return {
            products: [
                {
                    name: '',
                    description: '',
                    image: '',
                    price: 0,
                    id: 0,
                },
            ],
            top_k: 2,
        };
    },
    async created() {
        try {
            const { response } = await fetchRecommendationsAPI(this.top_k);
            this.products = response;
        } catch (error) {
            console.error(error);
        }
    }, methods: {
        async fetchRecommendations() {
            if (this.top_k < 1) {
                alert('Please enter a number greater than 0');
                return;
            }
            try {
                const { response } = await fetchRecommendationsAPI(this.top_k);
                this.products = response;
            } catch (error) {
                console.error(error);
            }
        },
    },
};


</script>