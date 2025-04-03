import * as UserResolver from "./Mostrans/user/UserResolver.ts";
import * as LandingResolver from "./Mostrans/General/LandingResolver.ts";
import * as ProductResolver from "./Mostrans/General/product.ts";
import * as ActivityLogResolver from "./Mostrans/General/activitylog.ts";


export type Resolver = {
  Query?: object;
  Mutation?: object;
};

const listResolver = [UserResolver, LandingResolver, ProductResolver, ActivityLogResolver]; 

const resolvers = {
  Query: {
    ...ProductResolver.Query,
    ...ActivityLogResolver.Query,
  },
  Mutation: {
    // Add any mutation resolvers here if needed
  },
};

listResolver.forEach((s) => {
  Object.assign(resolvers.Query, s.Query);
  Object.assign(resolvers.Mutation, s.Mutation);
});

export default resolvers as Resolver;
