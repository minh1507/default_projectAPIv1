import express from "express";
import { findAll, me, create, export_template } from "../controllers/user.controller.ts";
import * as rate from "../middleware/rateLimit.middleware.ts";
import * as auth from "../middleware/authorization.middleware.ts";
import message from "../common/message/message.common.ts";
import { body } from "express-validator";
import { findRoleById } from "../validators_db/role.validators_db.ts";
import { findGenderById } from "../validators_db/gender.validators_db.ts";
import { dublicateUser } from "../validators_db/user.validator_db.ts";
import { findAddressById } from "../validators_db/address.validators_db.ts";

let router = express.Router();

let userRoute = (app: any) => {
  router.get("/", rate.portal_trade, auth.authorizations, findAll);
  router.get("/me", rate.portal_trade, auth.authorizations_global, me);
  router.post(
    "/",
    rate.portal_trade,
    auth.authorizations,
    body("username").escape().notEmpty().withMessage(message.WRONG_ACCOUNT_EMPTY),
    body("username").isLength({min: 8, max: 20}).withMessage(message.ACCOUNT_LENGTH_INVALID),
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
        let existRole: any = await findRoleById(value);
        if (!existRole) {
          throw new Error(message.WRONG_ROLE_ID_NOT_EXIST);
        }
      }),
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
    create,
  );
  router.post("/export",  export_template)
  return app.use("/api/user", router);
};

export default userRoute;
