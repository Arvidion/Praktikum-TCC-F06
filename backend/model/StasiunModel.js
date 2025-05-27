import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Stasiun = db.define("stasiun", {
  idStasiun: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  namaStasiun: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: true,
  createdAt: "Tanggal_dibuat",
  updatedAt: "Tanggal_diperbarui",
});

export default Stasiun; 