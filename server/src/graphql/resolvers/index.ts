import questionResolvers from './question.ts';
import scalarsResolvers from './scalars.ts';
import answerResolvers from './answer.ts';
import merge from "lodash.merge";

const resolvers = merge(
    {},
    scalarsResolvers, questionResolvers, answerResolvers
);

export default resolvers;
