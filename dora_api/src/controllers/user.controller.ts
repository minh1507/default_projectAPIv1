import { Request, Response } from "express";
import * as service from "../services/user.service.ts";
import message from "../common/message/message.common.ts";
import { responseAPISucess } from "../common/message/response.common.ts";
import { validationResult } from "express-validator";

export const findAll = async (req: Request, res: Response) => {
  let result = await service.findAll();

  let release = {
    data: result,
    mes: message.SUCCESS,
  };
  return res.status(200).json(responseAPISucess(release));
};

export const me = async (req: Request, res: Response) => {
  let authorization: any = req.headers["authorization"];
  let token = authorization.split(" ")[1];

  let result = await service.me(token);

  let release = {
    data: result,
    mes: message.SUCCESS,
  };
  return res.status(200).json(responseAPISucess(release));
};

export const create = async (req: Request, res: Response) => {
  let data: any = req.body;
  let response = validationResult(req);

  if (response.isEmpty()) {
    let result = await service.create(data);
    let release = {
      data: result,
      mes: message.CREATE_ACCOUNT_SUCCESS,
    };
    return res.status(200).json(responseAPISucess(release));
  }

  return res.status(200).json({ errors: response.array() });
}