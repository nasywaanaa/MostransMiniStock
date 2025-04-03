import SequelizePkg from "sequelize";
import { MostransPG } from "../../../Database/MostransPGDB.ts";

const { Sequelize, DataTypes } = SequelizePkg;
const { sequelize } = MostransPG();

export const ProductModel = sequelize.define("products", {
  IDProduct: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "idproduct", 
  },
  ProductName: {
    type: DataTypes.STRING,
    field: "productname",
  },
  ProductCategory: {
    type: DataTypes.STRING,
    field: "productcategory",
  },
  ProductDescription: {
    type: DataTypes.TEXT,
    field: "productdescription",
  },
  TotalStock: {
    type: DataTypes.INTEGER,
    field: "totalstock",
  },
  Unit: {
    type: DataTypes.STRING,
    field: "unit",
  },
  MinimumCapacity: {
    type: DataTypes.INTEGER,
    field: "minimumcapacity",
  },
  MaximumCapacity: {
    type: DataTypes.INTEGER,
    field: "maximumcapacity",
  },
}, {
  timestamps: false,
  freezeTableName: true,
});
