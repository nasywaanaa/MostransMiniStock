// /DataSource/Mostrans/General/ActivityDS.ts

import { ActivityModel } from "../../../ModelDB/Mostrans/General/ActivityDB.ts";
import { ProductModel } from "../../../ModelDB/Mostrans/General/ProductDB.ts";

export const ActivityDataSource = {
  async logActivity(IDProduct: number, IDOperator: number, action: string, notes: string) {
    // Menyimpan log aktivitas setiap kali stock berubah
    return ActivityModel.create({
      IDProduct,
      IDOperator,
      Action: action,
      Notes: notes,
    });
  },
};
