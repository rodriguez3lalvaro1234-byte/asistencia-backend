import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }

  try {
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      usuario_id: decoded.id
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};
