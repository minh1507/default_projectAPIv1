import { responseAPIFailed } from "../common/message/response.common.ts";
import message from "../common/message/message.common.ts";
import { User } from "../entities/user.entities.ts";
import { NextFunction, Request, Response } from "express";
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { Role } from "../entities/role.entities.ts";
import { Sequelize } from "sequelize-typescript";

export async function dublicateUser(req: Request, res: Response, next: NextFunction) {
  let username = req.body.username;

  const record = await User.findOne({ where: { username: username, status: 1 } });

  let data = {
    data: username,
    mes: message.DUBLICATE_RECORD_ACCOUNT,
  };
  if (record) {
    res.status(200).json(responseAPIFailed(data));
  } else {
    next();
  }
}

export async function dublicateEmail(req: any, res: Response, next: NextFunction){
  let email = req.body.email

  const record = await User.findOne({ where: {email: email, status: 1} })

  let data = {
    data: email,
    mes: message.WRONG_EMAIL_IS_EXIST,
  };
  if (record) {
    res.status(200).json(responseAPIFailed(data));
  } else {
    next();
  }
}

export async function notDublicateUser(req: any, res: Response, next: NextFunction) {
  let username = req.body.username;

  const record: any = await User.findOne({
    where: { username: username, status: 1},
    include: [
      {
        model: Role,
        attributes: [],
        required: true,
      },
    ],
    attributes: ["username", [Sequelize.col("role.name"), "role"], "password", "accessToken", "refreshToken", "status", [Sequelize.fn('CONCAT', Sequelize.col("firstName"), " ", Sequelize.col("lastName")), "name"]],
    // plain: true,
    raw: true,
  });

  let data = {
    data: username,
    mes: message.NOT_DUBLICATE_RECORD_ACCOUNT,
  };

  if (record) {
    if (!record.status) {
      return res.status(200).json(responseAPIFailed(data));
    }
    req.body.result = record;
    next();
  } else {
    res.status(200).json(responseAPIFailed(data));
  }
}

export async function passwordWrong(req: any, res: Response, next: NextFunction) {
  let username = req.body.username;
  let password_db = req.body.result.password;
  let password = req.body.password;
  let check = compareSync(password, password_db);

  let data = {
    data: username,
    mes: message.WRONG_PASSWORD_COMPARE,
  };
  if (check) {
    next();
  } else {
    res.status(200).json(responseAPIFailed(data));
  }
}

export async function account_not_exist_in_db(req: any, res: Response, next: NextFunction) {
  let username = req.body.username;
  let username_db = req.body.result.username;

  let data = {
    data: username,
    mes: message.ACOUNT_WRONG_ATTRIBURE,
  };
  if (username == username_db) {
    next();
  } else {
    res.status(200).json(responseAPIFailed(data));
  }
}

export async function refresh_token_not_exist_in_db(req: any, res: Response, next: NextFunction) {
  let username = req.body.username;
  let refreshToken = req.body.refreshToken;
  let refreshToken_db = req.body.result.refreshToken;

  let data = {
    data: username,
    mes: message.REFRESH_TOKEN_WRONG_ATTRIBUTE,
  };
  if (refreshToken == refreshToken_db) {
    next();
  } else {
    res.status(200).json(responseAPIFailed(data));
  }
}
