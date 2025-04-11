import SequelizePkg from "sequelize";
import { MostransPG } from "../../../Database/MostransPGDB.ts";

const { Sequelize, DataTypes } = SequelizePkg;
const { sequelize } = MostransPG();

export const ActivityModel = sequelize.define("activities", {
  IDUpdate: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "idupdate",
  },
  IDProduct: {
    type: DataTypes.INTEGER,
    field: "idproduct",
    references: {
      model: "products", 
      key: "IDProduct",
    },
  },
  IDOperator: {
    type: DataTypes.INTEGER,
    field: "idoperator",
    references: {
      model: "users",  
      key: "IDOperator",
    },
  },
  Action: {
    type: DataTypes.STRING,
    field: "action",
  },
  Notes:  {
    type: DataTypes.TEXT,
    field: "action",
  },
  UpdateDate: {
    type: DataTypes.DATE,
    field: "updatedate",
    defaultValue: Sequelize.NOW,
  },
  UpdateTime: {
    type: DataTypes.DATE,
    field: "updatetime",
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});