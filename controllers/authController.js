import pool from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { dni, password } = req.body;

    const userQuery = await pool.query(
      "SELECT * FROM usuarios WHERE dni = $1",
      [dni]
    );

    if (userQuery.rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = userQuery.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, dni: user.dni },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        dni: user.dni,
        horario_id: user.horario_id
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};
