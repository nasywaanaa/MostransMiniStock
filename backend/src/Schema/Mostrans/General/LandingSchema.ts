import { gql } from "apollo-server-express";

export const types = `
  type Activity {
    IDUpdate: Int
    IDProduct: Int
    IDOperator: Int
    Action: String
    Notes: String
    UpdateDate: String
    UpdateTime: String
  }

  type Mutation {
    logProductActivity(IDProduct: Int!, IDOperator: Int!, action: String!, notes: String!): Activity
  }
`;

export const queries = ``; 

export const mutations = `
  logProductActivity(IDProduct: Int!, IDOperator: Int!, action: String!, notes: String!): Activity
`;
