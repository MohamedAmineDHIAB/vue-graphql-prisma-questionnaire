<template>
    <div v-if="isError">An error occured... {{ error.message }}</div>
    <div v-else class="product_container">
        <div class="product_name">
            <h3>{{ product.name.slice(0, 50) }}</h3>
        </div>
        <div class="product_image">
            <img :src="product.image" :alt="product.name" width="100" height="100" />
        </div>
        <div class="product_description">
            <p>{{ product.description.slice(0, 100) }}</p>
        </div>
        <div class="product_price">
            <p>Price: {{ product.price }}</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        error: {
            default: () => ({
                message: '',
            }),
        },
        isError: {
            default: false,
        },
        product: {
            default: () => ({
                name: '',
                description: '',
                image: '',
                price: 0,
                id: 0,
            }),
        },
    },
};
</script>