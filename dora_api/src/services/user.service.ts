import { User } from "../entities/user.entities.ts";
import { Role } from "../entities/role.entities.ts";
import { Sequelize } from "sequelize-typescript";
import jwt from "jsonwebtoken";
import { Gender } from "../entities/gender.entities.ts";
import { Address } from "../entities/address.entities.ts";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { Op } from "sequelize";

export const findAll = async (start: any, item: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      var data: any = [];

      data = await User.findAll({
        include: [
          {
            model: Role,
            attributes: [],
            required: true,
          },
          {
            model: Gender,
            attributes: [],
            required: true,
          },
          {
            model: Address,
            attributes: [],
            required: true,
          },
        ],
        attributes: ["id", "username", [Sequelize.col("role.name"), "role"], "email", [Sequelize.col("gender.name"), "gender"], [Sequelize.col("address.name"), "address"], "image", [Sequelize.fn("CONCAT", Sequelize.col("firstName"), " ", Sequelize.col("lastName")), "name"]],
        offset: start - 1,
        limit: parseInt(item),
        subQuery: false,
        order: [["name", "ASC"]],
        raw: true,
      });

      var result = {
        data: data,
        total: data.length,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const export_all = async (income: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      var data: any = [];

      data = await User.findAll({
        include: [
          {
            model: Role,
            attributes: [],
            required: true,
          },
          {
            model: Gender,
            attributes: [],
            required: true,
          },
          {
            model: Address,
            attributes: [],
            required: true,
          },
        ],
        attributes: ["id", "username", [Sequelize.col("role.name"), "role"], "email", [Sequelize.col("gender.name"), "gender"], [Sequelize.col("address.name"), "address"], "image", [Sequelize.fn("CONCAT", Sequelize.col("firstName"), " ", Sequelize.col("lastName")), "name"]],
        where: {
          createDate: {
            [Op.between]: [new Date(income.tuNgay), new Date(income.denNgay)]
          }
        },
        order: [["name", "ASC"]],
        raw: true,
      });

      var result = {
        data: data,
        total: data.length,
      };
      resolve(result);
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
        where: { username: decode.data.username, status: 1 },
        include: [
          {
            model: Role,
            attributes: [],
            required: true,
          },
          {
            model: Gender,
            attributes: [],
            required: true,
          },
          {
            model: Address,
            attributes: [],
            required: true,
          },
        ],
        attributes: ["username", [Sequelize.col("role.name"), "role"], "email", [Sequelize.col("gender.name"), "gender"], [Sequelize.col("address.name"), "address"], "image", [Sequelize.fn("CONCAT", Sequelize.col("firstName"), " ", Sequelize.col("lastName")), "name"]],
        // plain: true,
        raw: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const create = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = genSaltSync(10);
      const hashPassword = hashSync(data.password, salt);
      data.password = hashPassword;

      await User.create({
        ...data,
        image: data.genderId == 1 ? process.env.ROOT_DOMAIN + ":" + process.env.MAIN_PORT + "/static/avartar/avatar-default-image-male.png" : process.env.ROOT_DOMAIN + ":" + process.env.MAIN_PORT + "/static/avartar/avatar-default-image-female.png",
        status: 1,
        createDate: new Date(),
      });

      resolve(data.username);
    } catch (error) {
      reject(error);
    }
  });
};
