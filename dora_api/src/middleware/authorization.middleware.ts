import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/user.entities.ts";
import { Role } from "../entities/role.entities.ts";
import { Sequelize } from "sequelize-typescript";

export const authorizations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let authorization = req.headers["authorization"];

    if (!authorization) {
      return res.status(401).json({ mes: "You do not have permission to access this data." });
    }

    let token = authorization.split(" ");

    if (token.length != 2 || token[0] != "Bearer") {
      return res.status(401).json({ mes: "You do not have permission to access this data." });
    }

    var decoded = jwt.verify(token[1], process.env.PRIVATE_TOKEN);

    if (!decoded) {
      return res.status(401).json({ mes: "You do not have permission to access this data." });
    }

    let record: any = await User.findOne({
      where: { username: decoded.data.username },
      include: [
        {
          model: Role,
          attributes: [],
          required: true,
        },
      ],
      attributes: ["username", [Sequelize.col("role.name"), "role"], "accessToken"],
      raw: true,
    });

    if (!record || record.accessToken != token[1] || record.role != "Admin") {
      return res.status(401).json({ mes: "You do not have permission to access this data." });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ mes: "You do not have permission to access this data." });
  }
};

export const authorizations_global = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let authorization = req.headers["authorization"];

    if (!authorization) {
      return res.status(401).json({ mes: "You do not have permission to access this data." });
    }

    let token = authorization.split(" ");

    if (token.length != 2 || token[0] != "Bearer") {
      return res.status(401).json({ mes: "You do not have permission to access this data." });
    }

    var decoded = jwt.verify(token[1], process.env.PRIVATE_TOKEN);

    if (!decoded) {
      return res.status(401).json({ mes: "You do not have permission to access this data." });
    }

    let record: any = await User.findOne({
      where: { username: decoded.data.username },
      include: [
        {
          model: Role,
          attributes: [],
          required: true,
        },
      ],
      attributes: ["username", [Sequelize.col("role.name"), "role"], "accessToken"],
      raw: true,
    });

    if (!record || record.accessToken != token[1]) {
      return res.status(401).json({ mes: "You do not have permission to access this data." });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ mes: "You do not have permission to access this data." });
  }
};
