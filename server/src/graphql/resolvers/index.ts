import questionResolvers from './question.ts';
import scalarsResolvers from './scalars.ts';
import answerResolvers from './answer.ts';
import productResolvers from './product.ts';
import merge from "lodash.merge";

const resolvers = merge(
    {},
    scalarsResolvers, questionResolvers, answerResolvers, productResolvers
);

export default resolvers;
