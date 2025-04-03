import { IResolvers } from "npm:@graphql-tools/utils";

interface DataSources {
  LandingDatasource: {
    getSlider: () => Promise<any>;
  };
}

export const Query: IResolvers = {
  getSlider: async (
    _: any,
    __: any,
    { dataSources }: { dataSources: DataSources }
  ) => {
    return await dataSources.LandingDatasource.getSlider();
  },
};

export const Mutation: IResolvers = {};
