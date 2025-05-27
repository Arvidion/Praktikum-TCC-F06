import express from "express";
import { getUsers, register, login, refreshToken, logout } from "../controllers/UsersController.js";
import { getKereta, getKeretaById, createKereta, updateKereta, deleteKereta } from "../controllers/KeretaController.js";
import { getStasiun, getStasiunById, createStasiun, updateStasiun, deleteStasiun } from "../controllers/StasiunController.js";
import { getJadwal, getJadwalById, createJadwal, updateJadwal, deleteJadwal, getJadwalByStasiun } from "../controllers/JadwalController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// User routes
router.get('/users', getUsers);
router.post('/register', register);
router.post('/login', login);
router.patch('/token', refreshToken);
router.delete('/logout', logout); 

// Kereta routes
router.get('/kereta', verifyToken, getKereta);
router.get('/kereta/:id', verifyToken, getKeretaById);
router.post('/kereta', verifyToken, createKereta);
router.patch('/kereta/:id', verifyToken, updateKereta);
router.delete('/kereta/:id', verifyToken, deleteKereta);

// Stasiun routes
router.get('/stasiun', verifyToken, getStasiun);
router.get('/stasiun/:id', verifyToken, getStasiunById);
router.post('/stasiun', verifyToken, createStasiun);
router.patch('/stasiun/:id', verifyToken, updateStasiun);
router.delete('/stasiun/:id', verifyToken, deleteStasiun);

// Jadwal routes
router.get('/jadwal', verifyToken, getJadwal);
router.get('/jadwal/stasiun/:stasiunId', verifyToken, getJadwalByStasiun); // Harus ditempatkan sebelum route dengan :id
router.get('/jadwal/:id', verifyToken, getJadwalById);
router.post('/jadwal', verifyToken, createJadwal);
router.patch('/jadwal/:id', verifyToken, updateJadwal);
router.delete('/jadwal/:id', verifyToken, deleteJadwal);

router.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
}); 

export default router;