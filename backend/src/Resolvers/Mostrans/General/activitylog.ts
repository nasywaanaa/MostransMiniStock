import { ActivityDataSource } from "../../../DataSource/Mostrans/General/ActivityDS.ts";

export default {
  Query: {}, 
  Mutation: {
    logProductActivity: async (
      _: any,
      {
        IDProduct,
        IDOperator,
        action,
        notes,
      }: {
        IDProduct: number;
        IDOperator: number;
        action: string;
        notes: string;
      }
    ) => {
      return ActivityDataSource.logActivity(
        IDProduct,
        IDOperator,
        action,
        notes
      );
    },
  },
};
