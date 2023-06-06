import { responseAPIFailed } from "../common/message/response.common.ts";
import message from "../common/message/message.common.ts";
import { User } from "../entities/user.entities.ts";
import { NextFunction, Request, Response } from "express";


export async function dublicateUser(req: Request, res: Response, next: NextFunction){
    let username = req.body.username;

    const record = await User.findOne({ where: { username: username } });

    let data = {
        data: username,
        mes: message.DUBLICATE_RECORD_ACCOUNT
    }
    if(record){
        res.status(200).json(responseAPIFailed(data))
    }
    else{
        next()
    }
}

