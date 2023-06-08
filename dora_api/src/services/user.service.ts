import { User } from "../entities/user.entities.ts";
import { Role } from "../entities/role.entities.ts";
import { Sequelize } from "sequelize-typescript";
import jwt from "jsonwebtoken";

export const findAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data: any = await User.findAll({
        include: [
          {
            model: Role,
            attributes: [],
            required: true,
          },
        ],
        attributes: [
          "id",
          "username",
          "password",
          [Sequelize.col("role.name"), "role"],
          "accessToken",
          "refreshToken",
        ],
        // plain: true,
        raw: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const me = async (token: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      var decode = jwt.verify(token, process.env.PRIVATE_TOKEN);
      const data: any = await User.findOne({
        where: { username: decode.data.username },
        include: [
          {
            model: Role,
            attributes: [],
            required: true,
          },
        ],
        attributes: ["username", [Sequelize.col("role.name"), "role"]],
        // plain: true,
        raw: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
