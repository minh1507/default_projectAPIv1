import express from "express";
import { register, login, refresh, logout } from "../controllers/auth.controller.ts";
import * as rate from "../middleware/rateLimit.middleware.ts";
import message from "../common/message/message.common.ts";
import { body } from "express-validator";
import { findRoleById } from "../validators_db/role.validators_db.ts";
import { findGenderById } from "../validators_db/gender.validators_db.ts";
import { dublicateUser, notDublicateUser, passwordWrong, account_not_exist_in_db, refresh_token_not_exist_in_db } from "../validators_db/user.validator_db.ts";
import { findAddressById } from "../validators_db/address.validators_db.ts";

let router = express.Router();

let authRoute = (app: any) => {
  router.post(
    "/register",
    rate.auth,
    body("username").escape().notEmpty().withMessage(message.WRONG_ACCOUNT_EMPTY),
    body("username").isLength({min: 8, max: 20}).withMessage(message.ACCOUNT_LENGTH_INVALID),
    body("firstName").escape().notEmpty().withMessage(message.FIRST_NAME_EMPTY),
    body("lastName").escape().notEmpty().withMessage(message.LAST_NAME_EMPTY),
    body("password").escape().notEmpty().withMessage(message.WRONG_PASSWORD_EMPTY),
    body("password")
      .escape()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,20}$/)
      .withMessage(message.WRONG_PASSWORD_MATCH),
    body("genderId").escape().notEmpty().withMessage(message.WRONG_GENDER_ID_EMPTY),
    body("genderId").escape().isNumeric().withMessage(message.WRONG_GENDER_ID_NUMERIC),
    body("genderId")
      .escape()
      .custom(async (value: number) => {
        let existGender: any = await findGenderById(value);
        if (!existGender) {
          throw new Error(message.WRONG_GENDER_ID_NOT_EXIST);
        }
      }),
    body("addressId").escape().notEmpty().withMessage(message.WRONG_ADDRESS_ID_EMPTY),
    body("addressId").escape().isNumeric().withMessage(message.WRONG_ADDRESS_ID_NUMERIC),
    body("addressId")
      .escape()
      .custom(async (value: number) => {
        let existAddress: any = await findAddressById(value);
        if (!existAddress) {
          throw new Error(message.WRONG_ADDRESS_ID_NOT_EXIST);
        }
      }),
    dublicateUser,
    register,
  );
  router.post("/logout", rate.auth, body("username").escape().notEmpty().withMessage(message.WRONG_ACCOUNT_EMPTY), notDublicateUser, logout);
  router.post("/login", rate.auth, body("username").escape().notEmpty().withMessage(message.WRONG_ACCOUNT_EMPTY), body("password").escape().notEmpty().withMessage(message.WRONG_PASSWORD_EMPTY), notDublicateUser, passwordWrong, login);
  router.post("/refresh", rate.auth, body("username").escape().notEmpty().withMessage(message.WRONG_ACCOUNT_EMPTY), body("refreshToken").escape().notEmpty().withMessage(message.WRONG_REFRESH_TOKEN), notDublicateUser, account_not_exist_in_db, refresh_token_not_exist_in_db, refresh);
  return app.use("/api/auth", router);
};

export default authRoute;
