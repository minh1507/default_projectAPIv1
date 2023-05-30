import express from "express";
import {
  findAll,
  me
} from "../controllers/user.controller.ts";

let router = express.Router();

let userRoute = (app: any) => {
  router.get("/", findAll);
  router.get("/me", me)
 
  return app.use("/api/user", router);
};

export default userRoute;