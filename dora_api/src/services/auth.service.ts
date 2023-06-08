import { isTokenExpired } from "./../validators/token.validator.ts";
import { user, userWithId, userWithRefresh } from "../models/user.interface";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { User } from "../entities/user.entities.ts";
import message from "../common/message/message.common.ts";
import { Role } from "../entities/role.entities.ts";
import { Sequelize } from "sequelize-typescript";

import jwt from "jsonwebtoken";

export const register = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const salt = genSaltSync(10);
      const hashPassword = hashSync(data.password, salt);
      data.password = hashPassword;

      await User.create({
        ...data,
        image: data.genderId == 1 ? process.env.ROOT_DOMAIN + ":" + process.env.MAIN_PORT + "/static/avartar/avatar-default-image-male.png" : process.env.ROOT_DOMAIN + ":" + process.env.MAIN_PORT + "/static/avartar/avatar-default-image-female.png",
        genderId: data.genderId,
        addressId: 1,
        status: 1,
        createDate: new Date(),
      });

      resolve(data.username);
    } catch (error) {
      reject(error);
    }
  });
};

export const login = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let record = data.result;
      if (record.refreshToken) {
        var newData: any = {
          username: record.username,
          role: record.role,
        };

        if (isTokenExpired(record.refreshToken)) {
          let newRefreshToken = jwt.sign(
            {
              data: newData,
            },
            process.env.SECRET_TOKEN,
            { expiresIn: "720h" },
          );
          let newAccessToken = jwt.sign(
            {
              data: newData,
            },
            process.env.PRIVATE_TOKEN,
            { expiresIn: "24h" },
          );
          await User.update(
            {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            },
            { where: { username: record.username } },
          );
          newData.accessToken = newAccessToken;
          newData.refreshToken = newRefreshToken;
          resolve({ data: newData });
        } else {
          let newAccessToken = jwt.sign(
            {
              data: newData,
            },
            process.env.PRIVATE_TOKEN,
            { expiresIn: "24h" },
          );
          await User.update(
            {
              accessToken: newAccessToken,
            },
            { where: { username: record.username } },
          );
          newData.accessToken = newAccessToken;
          newData.refreshToken = record.refreshToken;
          resolve({ data: newData });
        }
      } else {
        var newData: any = {
          username: record.username,
          role: record.role,
        };

        let newRefreshToken = jwt.sign(
          {
            data: newData,
          },
          process.env.SECRET_TOKEN,
          { expiresIn: "720h" },
        );
        let newAccessToken = jwt.sign(
          {
            data: newData,
          },
          process.env.PRIVATE_TOKEN,
          { expiresIn: "24h" },
        );
        await User.update(
          {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
          { where: { username: record.username } },
        );
        newData.accessToken = newAccessToken;
        newData.refreshToken = newRefreshToken;
        resolve({ data: newData });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const refreshTK = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      let record = data.result;

      const newData = {
        username: record.username,
        role: record.role
      };
      if (!isTokenExpired(record.refreshToken)) {
        let newAccessToken = jwt.sign(
          {
            data: newData,
          },
          process.env.PRIVATE_TOKEN,
          { expiresIn: "24h" },
        );
        await User.update(
          {
            accessToken: newAccessToken,
          },
          { where: { username: record.username } },
        );
        resolve({
          data: { username: record.username, accessToken: newAccessToken }
        });
      }
      if (isTokenExpired(record.refreshToken)) {
        let newAccessToken = jwt.sign(
          {
            data: newData,
          },
          process.env.PRIVATE_TOKEN,
          { expiresIn: "24h" },
        );
        let newRefreshToken = jwt.sign(
          {
            data: newData,
          },
          process.env.SECRET_TOKEN,
          { expiresIn: "720h" },
        );
        await User.update(
          {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
          { where: { username: record.username } },
        );
        resolve({
          data: {
            username: record.username,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          }
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
