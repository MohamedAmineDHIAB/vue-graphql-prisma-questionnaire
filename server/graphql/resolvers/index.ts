import questionsResolvers from './question.js';
import scalarsResolvers from './scalars.js';
import merge from "lodash.merge";

const resolvers = merge(
    {},
    scalarsResolvers, questionsResolvers
);

export default resolvers;
