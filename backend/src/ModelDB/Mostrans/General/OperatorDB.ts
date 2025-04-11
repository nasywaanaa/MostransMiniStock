import SequelizePkg from "sequelize";
import { MostransPG } from "../../../Database/MostransPGDB.ts";

const { Sequelize, DataTypes } = SequelizePkg;
const { sequelize } = MostransPG();

export const OperatorModel = sequelize.define("users", {
  IDOperator: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
    field: "idoperator",
  },
  OperatorName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "operatorname",
  },
}, {
  timestamps: false, 
  freezeTableName: true,
});
