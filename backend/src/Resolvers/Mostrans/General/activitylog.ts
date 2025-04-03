// /Resolvers/Mostrans/General/activitylog.ts

import { ActivityDataSource } from "../../../DataSource/Mostrans/General/ActivityDS.ts";

export default {
  Mutation: {
    logProductActivity: async (_: any, { IDProduct, IDOperator, action, notes }: { IDProduct: number; IDOperator: number; action: string; notes: string }) => {
      return ActivityDataSource.logActivity(IDProduct, IDOperator, action, notes);
    },
  },
};
