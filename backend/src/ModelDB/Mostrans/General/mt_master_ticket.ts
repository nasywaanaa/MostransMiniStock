import SequelizeModule from "sequelize";
import { MostransPG } from "../../../Database/MostransPGDB.ts"; 

const { Sequelize, DataTypes } = SequelizeModule;
const { sequelize } = MostransPG();

export const TicketModel = sequelize.define("mt_master_ticket", {
  ticket_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ticket_number: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  customer_name: DataTypes.STRING,
  customer_email: DataTypes.STRING,
  status_id: DataTypes.INTEGER,
  due_date: DataTypes.DATE,
}, {
  timestamps: false,
  freezeTableName: true,
});
