import { Kereta } from "../model/index.js";

// Get all trains
export const getKereta = async (req, res) => {
    try {
        const kereta = await Kereta.findAll({
            attributes: ['idKereta', 'nomorKereta', 'jenisKereta']
        });
        res.json(kereta);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Get train by ID
export const getKeretaById = async (req, res) => {
    try {
        const kereta = await Kereta.findOne({
            where: {
                idKereta: req.params.id
            }
        });
        if (!kereta) return res.status(404).json({ msg: "Data kereta tidak ditemukan" });
        res.json(kereta);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create a new train
export const createKereta = async (req, res) => {
    const { nomorKereta, jenisKereta } = req.body;
    try {
        await Kereta.create({
            nomorKereta: nomorKereta,
            jenisKereta: jenisKereta
        });
        res.status(201).json({ msg: "Kereta berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Update train data
export const updateKereta = async (req, res) => {
    try {
        const kereta = await Kereta.findOne({
            where: {
                idKereta: req.params.id
            }
        });
        if (!kereta) return res.status(404).json({ msg: "Data kereta tidak ditemukan" });
        
        const { nomorKereta, jenisKereta } = req.body;
        await Kereta.update({
            nomorKereta: nomorKereta,
            jenisKereta: jenisKereta
        }, {
            where: {
                idKereta: req.params.id
            }
        });
        res.status(200).json({ msg: "Data kereta berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// Delete train
export const deleteKereta = async (req, res) => {
    try {
        const kereta = await Kereta.findOne({
            where: {
                idKereta: req.params.id
            }
        });
        if (!kereta) return res.status(404).json({ msg: "Data kereta tidak ditemukan" });
        
        await Kereta.destroy({
            where: {
                idKereta: req.params.id
            }
        });
        res.status(200).json({ msg: "Data kereta berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
} 