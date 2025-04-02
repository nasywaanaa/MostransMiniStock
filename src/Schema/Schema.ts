import * as ResponseSchema from "./Mostrans/Response/ResponseSchema.ts";
import * as UserSchema from "./Mostrans/user/UserSchema.ts";
import * as LandingSchema from "./Mostrans/General/LandingSchema.ts";

import { gql } from "apollo-server-express";

const types: string[] = [];
const inputs: string[] = [];
const queries: string[] = [];
const mutations: string[] = [];

const schemas = [UserSchema, ResponseSchema, LandingSchema];

schemas.forEach((s) => {
  if (s.types) types.push(s.types as string);
  if (s.inputs) inputs.push(s.inputs as string);
  if (s.queries) queries.push(s.queries as string);
  if (s.mutations) mutations.push(s.mutations as string);
});

const typeDefs = gql` 
  ${types.join("\n")}

  ${inputs.join("\n")}
  
  type Query {
    ${queries.join("\n")}
  }

  type Mutation {
    ${mutations.join("\n")}
  }
`;

export default typeDefs;
