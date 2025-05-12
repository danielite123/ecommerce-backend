import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ error: "No Access token" });
  }
  jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Access token is invalid" });
    req.user = decoded; // ✅ this makes req.user.role available
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};
