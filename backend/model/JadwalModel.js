import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import Stasiun from "./StasiunModel.js";
import Kereta from "./KeretaModel.js";

const Jadwal = db.define("jadwal", {
  idJadwal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idStasiunAwal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Stasiun,
      key: 'idStasiun'
    }
  },
  idStasiunAkhir: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Stasiun,
      key: 'idStasiun'
    }
  },
  idKereta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Kereta,
      key: 'idKereta'
    }
  },
  namaRute: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  waktuKeberangkatan: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  waktuTiba: {
    type: DataTypes.TIME,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  timestamps: true,
  createdAt: "Tanggal_dibuat",
  updatedAt: "Tanggal_diperbarui",
});

// Define associations
Jadwal.belongsTo(Stasiun, { as: 'StasiunAwal', foreignKey: 'idStasiunAwal' });
Jadwal.belongsTo(Stasiun, { as: 'StasiunAkhir', foreignKey: 'idStasiunAkhir' });
Jadwal.belongsTo(Kereta, { as: 'Kereta', foreignKey: 'idKereta' });

export default Jadwal; 