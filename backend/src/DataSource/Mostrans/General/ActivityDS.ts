// /DataSource/Mostrans/General/ActivityDS.ts

import { ActivityModel } from "../../../ModelDB/Mostrans/General/ActivityDB.ts";
import { ProductModel } from "../../../ModelDB/Mostrans/General/ProductDB.ts";
import { OperatorModel } from "../../../ModelDB/Mostrans/General/OperatorDB.ts";

export const ActivityDataSource = {
  async logActivity(IDProduct: number, IDOperator: number, action: string, notes: string) {
    const product = await ProductModel.findByPk(IDProduct);
    const operator = await OperatorModel.findByPk(IDOperator);

    if (!product || !operator) return null; // Ensure the product and operator exist

    const newActivity = await ActivityModel.create({
      IDUpdate,
      IDProduct,
      IDOperator,
      Action: action,
      Notes: notes,
      UpdateDate: new Date(),
      UpdateTime: new Date(),
    });

    return newActivity;
  },
};
