import * as UserResolver from "./Mostrans/user/UserResolver.ts";
import * as LandingResolver from "./Mostrans/General/LandingResolver.ts";

export type Resolver = {
  Query?: object;
  Mutation?: object;
};

const listResolver = [UserResolver, LandingResolver];

const resolvers = {
  Query: {},
  Mutation: {},
};

listResolver.forEach((s) => {
  Object.assign(resolvers.Query, s.Query);
  Object.assign(resolvers.Mutation, s.Mutation);
});

export default resolvers as Resolver; // Use 'as any' to satisfy TypeScript without explicit Resolvers type
