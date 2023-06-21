// This file contains a function that will seed the database with our list of products
import getFakeProduct from "../data/products_data.ts";


const questions_seeder = async (prisma: any) => {
    for (let i = 0; i < 20; i++) {
        const product = await getFakeProduct(i + 1);
        // create the product and if it exists, update it
        await prisma.products.upsert({
            where: { id: i + 1 },
            update: {
                name: product.name,
                description: product.description,
                price: product.price,
                answers_vector: product.answers_vector,
                image: product.image,
            },
            create: {
                id: i + 1,
                name: product.name,
                description: product.description,
                price: product.price,
                answers_vector: product.answers_vector,
                image: product.image,
            },
        });

    }

}

export default questions_seeder;

