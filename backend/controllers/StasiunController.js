import { Stasiun } from "../model/index.js";

// Get all stations
export const getStasiun = async (req, res) => {
    try {
        const stasiun = await Stasiun.findAll({
            attributes: ['idStasiun', 'namaStasiun']
        });
        res.json(stasiun);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get station by ID
export const getStasiunById = async (req, res) => {
    try {
        const stasiun = await Stasiun.findOne({
            where: {
                idStasiun: req.params.id
            }
        });
        if (!stasiun) return res.status(404).json({ msg: "Data stasiun tidak ditemukan" });
        res.json(stasiun);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create a new station
export const createStasiun = async (req, res) => {
    const { namaStasiun } = req.body;
    try {
        await Stasiun.create({
            namaStasiun: namaStasiun
        });
        res.status(201).json({ msg: "Stasiun berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update station data
export const updateStasiun = async (req, res) => {
    try {
        const stasiun = await Stasiun.findOne({
            where: {
                idStasiun: req.params.id
            }
        });
        if (!stasiun) return res.status(404).json({ msg: "Data stasiun tidak ditemukan" });
        
        const { namaStasiun } = req.body;
        await Stasiun.update({
            namaStasiun: namaStasiun
        }, {
            where: {
                idStasiun: req.params.id
            }
        });
        res.status(200).json({ msg: "Data stasiun berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Delete station
export const deleteStasiun = async (req, res) => {
    try {
        const stasiun = await Stasiun.findOne({
            where: {
                idStasiun: req.params.id
            }
        });
        if (!stasiun) return res.status(404).json({ msg: "Data stasiun tidak ditemukan" });
        
        await Stasiun.destroy({
            where: {
                idStasiun: req.params.id
            }
        });
        res.status(200).json({ msg: "Data stasiun berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
} 