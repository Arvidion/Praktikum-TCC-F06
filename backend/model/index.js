import db from "../config/Database.js";
import User from "./UsersModel.js";
import Stasiun from "./StasiunModel.js";
import Kereta from "./KeretaModel.js";
import Jadwal from "./JadwalModel.js";

// Kereta.hasMany(Jadwal, { foreignKey: "keretaId", onDelete: "CASCADE" });
// Jadwal.belongsTo(Kereta, { foreignKey: "keretaId" });
// Stasiun.hasMany(Jadwal, { foreignKey: "stasiunId", onDelete: "CASCADE" });
// Jadwal.belongsTo(Kereta, { foreignKey: "stasiunId" });

(async () => {
  try {
    await db.authenticate();
    console.log("Koneksi database berhasil!");

    await db.sync({ alter: true });
    console.log("Semua tabel berhasil disinkronisasi.");
  } catch (err) {
    console.error("Gagal konek DB:", err);
  }
})();

export { User, Stasiun, Kereta, Jadwal };
