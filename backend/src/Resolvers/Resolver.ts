import * as UserResolver from "./Mostrans/user/UserResolver.ts";
import * as LandingResolver from "./Mostrans/General/LandingResolver.ts";
import ProductResolver from "./Mostrans/General/product.ts";

export type Resolver = {
  Query?: object;
  Mutation?: object;
};

const listResolver = [UserResolver, LandingResolver, ProductResolver]; 

const resolvers = {
  Query: {},
  Mutation: {},
};

listResolver.forEach((s) => {
  Object.assign(resolvers.Query, s.Query);
  Object.assign(resolvers.Mutation, s.Mutation);
});

export default resolvers as Resolver;
