import { ProductModel } from "../../../ModelDB/Mostrans/General/ProductDB.ts";

import { DataSource, DataSourceConfig } from "apollo-datasource";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";


const calculateStatus = (stock: number, min: number, max: number) => {
  if (stock < min) return "Under Capacity";
  if (stock > max) return "Over Capacity";
  return "Normal";
};

export const ProductDataSource = {
  async getAllProducts() {
    const products = await ProductModel.findAll();
    console.log("products:", products);
    return products.map((p: any) => ({
      ...p.toJSON(),
      Status: calculateStatus(p.TotalStock, p.MinimumCapacity, p.MaximumCapacity),
    }));
  },

  async getProductById(IDProduct: number) {
    const product = await ProductModel.findByPk(IDProduct);
    if (!product) return null;

    const data = product.toJSON();
    return {
      ...data,
      Status: calculateStatus(data.TotalStock, data.MinimumCapacity, data.MaximumCapacity),
    };
  },

  async updateStockByAction(IDProduct: number, quantity: number, action: "ADD" | "DELETE") {
    const product = await ProductModel.findByPk(IDProduct);
    if (!product) return null;
  
    let updatedStock = product.TotalStock;
  
    if (action === "ADD") {
      updatedStock += quantity;
    } else if (action === "DELETE") {
      updatedStock -= quantity;
      if (updatedStock < 0) updatedStock = 0; 
    }
  
    await product.update({ TotalStock: updatedStock });
    const updated = product.toJSON();
  
    return {
      ...updated,
      Status: calculateStatus(updated.TotalStock, updated.MinimumCapacity, updated.MaximumCapacity),
    };
  }  
};
