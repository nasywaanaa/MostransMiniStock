import { IResolvers } from "npm:@graphql-tools/utils";

interface User {
  id: number;
  nama: string;
  phone: string;
  email: string;
  create_by: number;
  create_date: Date;
}

interface UserResponse {
  data: User | null;
  response: Response;
}

interface Token {
  id: number;
  token: string;
  timeout: Date;
}

export interface tokenResponse {
  data: Token[] | null;
  response: Response;
  expired: boolean;
}

interface TokenInput {
  token: string;
}

interface DataSources {
  UserDatasource: {
    getAllUser: (
      pageNumber: number,
      pageSize: number,
      s: Record<string, any>
    ) => Promise<User[]>;
    getAllToken: (
      pageNumber: number,
      pageSize: number
    ) => Promise<tokenResponse>;
    getUserById: (id: string) => Promise<UserResponse>;

    userLogin: (email: string, password: string) => Promise<UserResponse>;

    insertToken: (inputs: TokenInput) => Promise<Response>;
  };
}

export const Query: IResolvers = {
  getAllUser: async (
    _: any,
    {
      pageNumber = 1,
      pageSize = 10,
      filters = {},
    }: {
      pageNumber?: number;
      pageSize?: number;
      filters?: Record<string, any>;
    },
    { dataSources }: { dataSources: DataSources }
  ) => {
    const result = await dataSources.UserDatasource.getAllUser(
      pageNumber,
      pageSize,
      filters
    );
    return result;
  },

  getUserById: async (
    _: any,
    { id }: { id: string },
    { dataSources }: { dataSources: DataSources }
  ) => {
    const result = await dataSources.UserDatasource.getUserById(id);
    return result;
  },

  getAllToken: async (
    _: any,
    {
      pageNumber = 1,
      pageSize = 10,
    }: {
      pageNumber?: number;
      pageSize?: number;
    },
    { dataSources }: { dataSources: DataSources }
  ) => {
    const result = await dataSources.UserDatasource.getAllToken(
      pageNumber,
      pageSize
    );

    return result;
  },

  getLatestToken: async (
    _: any,
    __: any,
    { dataSources }: { dataSources: DataSources }
  ) => {
    const result = await dataSources.UserDatasource.getAllToken(1, 1);

    if (result.data) {
      result.expired = new Date() > result.data[0].timeout;
    }

    return result;
  },

  userLogin: async (
    _: any,
    { email, password }: { email: string; password: string },
    { dataSources }: { dataSources: DataSources }
  ) => {
    const result = await dataSources.UserDatasource.userLogin(email, password);
    return result;
  },
};

export const Mutation: IResolvers = {
  insertToken: async (
    _: any,
    { input }: { input: TokenInput },
    { dataSources }: { dataSources: DataSources }
  ) => {
    const result = await dataSources.UserDatasource.insertToken(input);
    return result;
  },
};
