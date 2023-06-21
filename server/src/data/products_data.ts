import questions from "./questions_data.ts"
import axios from "axios";

const getRandomBinary = () => {
    return Math.random() > 0.5 ? 1 : 0;
}
const getRandomFloat = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}
const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
const getRandomVector = () => {
    let answers_vector: any = [];
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        switch (question.type) {
            case "range":
                const min = parseFloat(question.options[0]);
                const max = parseFloat(question.options[1]);
                answers_vector.push(getRandomFloat(min, max));
                break;
            case "radio":
                const num = getRandomInt(1, question.options.length);
                answers_vector = answers_vector.concat(question.options.map((_, i) => i === num ? 1 : 0));
                break;
            default:
                answers_vector = answers_vector.concat(question.options.map(() => getRandomBinary()));
                break;
        }
    }
    return answers_vector
}

async function getFakeProduct(i: number) {
    const fakeProduct = await axios.get(`https://fakestoreapi.com/products/${i}`)
    const product =
    {
        name: fakeProduct.data.title,
        description: fakeProduct.data.description,
        price: fakeProduct.data.price,
        image: fakeProduct.data.image,
        answers_vector: getRandomVector(),
    }
    return product;
}

export default getFakeProduct;


