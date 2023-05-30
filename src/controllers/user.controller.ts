import { Request, Response } from "express";
import * as service from "../services/user.service.ts";

export const findAll = async (req: Request, res: Response) => {
  let result = await service.findAll();
  return res.status(200).json(result);
};

export const me = async (req: Request, res: Response) => {
  let authorization = req.headers["authorization"];
  if (authorization) {
    let token = authorization.split(" ")[1];
    if (token) {
      let result = await service.me(token);
      return res.status(200).json(result);
    } else {
      return res.status(401);
    }
  } else {
    return res.status(401);
  }
};
