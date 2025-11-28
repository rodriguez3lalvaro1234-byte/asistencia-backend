import express from "express";
import { marcarEntrada, marcarSalida } from "../controllers/asistenciaController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/entrada", verifyToken, marcarEntrada);
router.post("/salida", verifyToken, marcarSalida);

export default router;
