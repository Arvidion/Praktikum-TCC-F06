import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Kereta = db.define("kereta", {
  idKereta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomorKereta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jenisKereta: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: true,
  createdAt: "Tanggal_dibuat",
  updatedAt: "Tanggal_diperbarui",
});

export default Kereta; 