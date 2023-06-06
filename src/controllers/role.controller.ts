import { Request, Response } from "express";
import * as service from "../services/role.service.ts";

export const findById = async (req: Request, res: Response) => {
    let id = req.params["id"];
    let result: any = await service.findById(id);
    return res.status(200).json(result);
  };
  