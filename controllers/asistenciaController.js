import pool from "../database.js";

export const marcarEntrada = async (req, res) => {
  try {
    const { usuario_id } = req.user;

    await pool.query(
      `INSERT INTO asistencias (usuario_id, fecha, hora_entrada)
       VALUES ($1, CURRENT_DATE, CURRENT_TIME)`,
      [usuario_id]
    );

    res.json({ message: "Entrada marcada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al marcar entrada" });
  }
};

export const marcarSalida = async (req, res) => {
  try {
    const { usuario_id } = req.user;

    await pool.query(
      `UPDATE asistencias 
       SET hora_salida = CURRENT_TIME
       WHERE usuario_id = $1 AND fecha = CURRENT_DATE`,
      [usuario_id]
    );

    res.json({ message: "Salida marcada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al marcar salida" });
  }
};
