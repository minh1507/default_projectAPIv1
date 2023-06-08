import express from "express";
import { register, login, refresh } from "../controllers/auth.controller.ts";
import * as rate from "../middleware/rateLimit.middleware.ts";
import message from "../common/message/message.common.ts";
import { body } from "express-validator";
import { findRoleById } from "../validators_db/role.validators_db.ts";
import { dublicateUser, notDublicateUser, passwordWrong, account_not_exist_in_db, refresh_token_not_exist_in_db } from "../validators_db/user.validator_db.ts";

let router = express.Router();

let authRoute = (app: any) => {
  router.post(
    "/register",
    rate.auth,
    body("username").escape().notEmpty().withMessage(message.WRONG_ACCOUNT_EMPTY),
    body("password").escape().notEmpty().withMessage(message.WRONG_PASSWORD_EMPTY),
    body("password")
      .escape()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/)
      .withMessage(message.WRONG_PASSWORD_MATCH),
    body("roleId").escape().notEmpty().withMessage(message.WRONG_ROLE_ID_EMPTY),
    body("roleId").escape().isNumeric().withMessage(message.WRONG_ROLE_ID_NUMERIC),
    body("roleId")
      .escape()
      .custom(async (value: number) => {
        let existRole:any = await findRoleById(value);
        if (!existRole) {
          throw new Error(message.WRONG_ROLE_ID_NOT_EXIST);
        }
        if(!existRole.status){
          throw new Error(message.WRONG_ROLE_ID_NOT_EXIST);
        }
      }),
    dublicateUser,
    register,
  );
  router.post("/login", rate.auth, body("username").escape().notEmpty().withMessage(message.WRONG_ACCOUNT_EMPTY), body("password").escape().notEmpty().withMessage(message.WRONG_PASSWORD_EMPTY), notDublicateUser, passwordWrong, login);
  router.post("/refresh", rate.auth, body("username").escape().notEmpty().withMessage(message.WRONG_ACCOUNT_EMPTY), body("refreshToken").escape().notEmpty().withMessage(message.WRONG_REFRESH_TOKEN), notDublicateUser, account_not_exist_in_db, refresh_token_not_exist_in_db, refresh);
  return app.use("/api/auth", router);
};

export default authRoute;
