import { Jadwal, Stasiun, Kereta } from "../model/index.js";
import { Op } from "sequelize";

// Get all schedules with station and train details
export const getJadwal = async (req, res) => {
    try {
        const jadwal = await Jadwal.findAll({
            attributes: ['idJadwal', 'namaRute', 'waktuKeberangkatan', 'waktuTiba'],
            include: [
                {
                    model: Stasiun,
                    as: 'StasiunAwal',
                    attributes: ['idStasiun', 'namaStasiun']
                },
                {
                    model: Stasiun,
                    as: 'StasiunAkhir',
                    attributes: ['idStasiun', 'namaStasiun']
                },
                {
                    model: Kereta,
                    as: 'Kereta',
                    attributes: ['idKereta', 'nomorKereta']
                }
            ]
        });
        res.json(jadwal);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get schedule by ID
export const getJadwalById = async (req, res) => {
    try {
        const jadwal = await Jadwal.findOne({
            where: {
                idJadwal: req.params.id
            },
            include: [
                {
                    model: Stasiun,
                    as: 'StasiunAwal',
                    attributes: ['idStasiun', 'namaStasiun']
                },
                {
                    model: Stasiun,
                    as: 'StasiunAkhir',
                    attributes: ['idStasiun', 'namaStasiun']
                },
                {
                    model: Kereta,
                    as: 'Kereta',
                    attributes: ['idKereta', 'nomorKereta', 'jenisKereta']
                }
            ]
        });
        if (!jadwal) return res.status(404).json({ msg: "Data jadwal tidak ditemukan" });
        res.json(jadwal);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create a new schedule
export const createJadwal = async (req, res) => {
    const { idStasiunAwal, idStasiunAkhir, idKereta, namaRute, waktuKeberangkatan, waktuTiba } = req.body;
    try {
        // Validate if stations exist
        const stasiunAwal = await Stasiun.findByPk(idStasiunAwal);
        const stasiunAkhir = await Stasiun.findByPk(idStasiunAkhir);
        if (!stasiunAwal || !stasiunAkhir) {
            return res.status(404).json({ msg: "Stasiun awal atau akhir tidak ditemukan" });
        }

        // Validate if train exists
        const kereta = await Kereta.findByPk(idKereta);
        if (!kereta) {
            return res.status(404).json({ msg: "Kereta tidak ditemukan" });
        }

        // Create schedule
        await Jadwal.create({
            idStasiunAwal,
            idStasiunAkhir,
            idKereta,
            namaRute,
            waktuKeberangkatan,
            waktuTiba
        });
        res.status(201).json({ msg: "Jadwal berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update schedule
export const updateJadwal = async (req, res) => {
    const { idStasiunAwal, idStasiunAkhir, idKereta, namaRute, waktuKeberangkatan, waktuTiba } = req.body;
    try {
        const jadwal = await Jadwal.findOne({
            where: {
                idJadwal: req.params.id
            }
        });
        if (!jadwal) return res.status(404).json({ msg: "Data jadwal tidak ditemukan" });

        // Validate if stations exist
        if (idStasiunAwal && idStasiunAkhir) {
            const stasiunAwal = await Stasiun.findByPk(idStasiunAwal);
            const stasiunAkhir = await Stasiun.findByPk(idStasiunAkhir);
            if (!stasiunAwal || !stasiunAkhir) {
                return res.status(404).json({ msg: "Stasiun awal atau akhir tidak ditemukan" });
            }
        }

        // Validate if train exists
        if (idKereta) {
            const kereta = await Kereta.findByPk(idKereta);
            if (!kereta) {
                return res.status(404).json({ msg: "Kereta tidak ditemukan" });
            }
        }

        // Update schedule
        await Jadwal.update({
            idStasiunAwal,
            idStasiunAkhir,
            idKereta,
            namaRute,
            waktuKeberangkatan,
            waktuTiba
        }, {
            where: {
                idJadwal: req.params.id
            }
        });
        res.status(200).json({ msg: "Data jadwal berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Delete schedule
export const deleteJadwal = async (req, res) => {
    try {
        const jadwal = await Jadwal.findOne({
            where: {
                idJadwal: req.params.id
            }
        });
        if (!jadwal) return res.status(404).json({ msg: "Data jadwal tidak ditemukan" });
        
        await Jadwal.destroy({
            where: {
                idJadwal: req.params.id
            }
        });
        res.status(200).json({ msg: "Data jadwal berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Get schedules by station
export const getJadwalByStasiun = async (req, res) => {
    const { stasiunId } = req.params;
    try {
        const jadwal = await Jadwal.findAll({
            where: {
                [Op.or]: [
                    { idStasiunAwal: stasiunId },
                    { idStasiunAkhir: stasiunId }
                ]
            },
            include: [
                {
                    model: Stasiun,
                    as: 'StasiunAwal',
                    attributes: ['idStasiun', 'namaStasiun']
                },
                {
                    model: Stasiun,
                    as: 'StasiunAkhir',
                    attributes: ['idStasiun', 'namaStasiun']
                },
                {
                    model: Kereta,
                    as: 'Kereta',
                    attributes: ['idKereta', 'nomorKereta', 'jenisKereta']
                }
            ]
        });
        res.json(jadwal);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
} 