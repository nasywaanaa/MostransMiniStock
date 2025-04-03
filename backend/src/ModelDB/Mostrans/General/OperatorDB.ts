// /ModelDB/Mostrans/user/UserDB.ts

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
  timestamps: false, // Tidak ada timestamp untuk pembuatan dan pembaruan (kecuali diperlukan)
  freezeTableName: true, // Menjaga nama tabel tetap 'users' tanpa penambahan otomatis 's'
});
