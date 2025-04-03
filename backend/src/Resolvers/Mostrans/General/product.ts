import { ProductDataSource } from "../../../DataSource/Mostrans/General/ProductDS.ts";

export default {
  Query: {
    getAllProducts: () => ProductDataSource.getAllProducts(),
    getProductById: (_: any, args: { IDProduct: number }) =>
      ProductDataSource.getProductById(args.IDProduct),
  },

  Mutation: {
    updateProductStock: (_: any, args: { IDProduct: number; quantity: number; action: "ADD" | "DELETE" }) =>
      ProductDataSource.updateStockByAction(args.IDProduct, args.quantity, args.action),
    
  },  
};
