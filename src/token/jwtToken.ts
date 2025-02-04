import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";
config();
import Jwt from "jsonwebtoken";

const secreteKey: string = String(process.env.SecreteKey);

const createToken = (user: object) => {
  const accessToken = Jwt.sign({ user }, secreteKey);
  return accessToken;
};

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies?.FoodToken;
  try {
    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }

    Jwt.verify(token, secreteKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Failed to authenticate token." });
      }

      const userId = decoded;
      next();
    });
  } catch {
    return null;
  }
};
export { createToken, verifyToken };
