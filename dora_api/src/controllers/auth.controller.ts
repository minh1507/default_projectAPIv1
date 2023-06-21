import { Request, Response } from "express";
import message from "../common/message/message.common.ts";
import { user } from "../models/user.interface";
import * as service from "../services/auth.service.ts";
import { validationResult } from "express-validator";
import { responseAPISucess } from "../common/message/response.common.ts";

export const register = async (req: Request, res: Response) => {
  let data: user = req.body;
  let response = validationResult(req);

  if (response.isEmpty()) {
    let result = await service.register(data);
    let release = {
      data: result,
      mes: message.CREATE_ACCOUNT_SUCCESS,
    };
    return res.status(200).json(responseAPISucess(release));
  }

  return res.status(200).json({ errors: response.array() });
};

export const logout = async (req: Request, res: Response) => {
  let data: user = req.body;
  let response = validationResult(req);

  if (response.isEmpty()) {
    let result: any = await service.logout(data);
    let release = {
      data: result.data,
      mes: message.LOG_OUT,
    };

    return res.status(200).json(responseAPISucess(release));
  }
  return res.status(200).json({ errors: response.array() });
}

export const login = async (req: Request, res: Response) => {
  let data: user = req.body;
  let response = validationResult(req);

  if (response.isEmpty()) {
    let result: any = await service.login(data);
    let release = {
      data: result.data,
      mes: message.LOGIN_SUCCESS,
    };

    return res.status(200).json(responseAPISucess(release));
  }
  return res.status(200).json({ errors: response.array() });
};

export const refresh = async (req: Request, res: Response) => {
  let data: any = req.body;

  let response = validationResult(req);

  if (response.isEmpty()) {
    let result: any = await service.refreshTK(data);

    let release = {
      data: result.data,
      mes: message.TOKEN_HANDLE_EXPIRE_SUCCESS,
    };

    return res.status(200).json(responseAPISucess(release));
  }
  return res.status(200).json({ errors: response.array() });
};
