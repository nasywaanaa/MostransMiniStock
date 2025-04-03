// /ModelDB/Mostrans/General/ActivityDB.ts

import SequelizePkg from "sequelize";
import { MostransPG } from "../../../Database/MostransPGDB.ts";

const { Sequelize, DataTypes } = SequelizePkg;
const { sequelize } = MostransPG();

export const ActivityModel = sequelize.define("activities", {
  IDUpdate: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  IDProduct: {
    type: DataTypes.INTEGER,
    references: {
      model: "products", // Menyambungkan ke tabel products
      key: "IDProduct",
    },
  },
  IDOperator: {
    type: DataTypes.INTEGER,
    references: {
      model: "users", // Menyambungkan ke tabel users (IDOperator)
      key: "IDOperator",
    },
  },
  Action: DataTypes.STRING,
  Notes: DataTypes.TEXT,
  UpdateDate: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW, // Default timestamp saat update
  },
  UpdateTime: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
  freezeTableName: true,
});

