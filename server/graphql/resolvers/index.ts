import questionResolvers from './question.js';
import scalarsResolvers from './scalars.js';
import answerResolvers from './answer.js';
import merge from "lodash.merge";

const resolvers = merge(
    {},
    scalarsResolvers, questionResolvers, answerResolvers
);

export default resolvers;
