import express from "express";
import {
  findAll,
  findById,
  create,
  deleteById,
  update,
  findPath
} from "../controllers/cat.controller.ts";
import multer from "multer";

import * as auth from "../middleware/authorization.middleware.ts";
import * as rate from "../middleware/rateLimit.middleware.ts";
import * as configMulter from "../middleware/multer.middleware.ts";

let router = express.Router();
let upload = multer({ storage: configMulter.png });

let catRoute = (app: any) => {
  router.get("/",  findAll);
  router.get("/path",  findPath);
  router.get("/:id",  findById);
  router.post("/", auth.authorizations, upload.array("files"), create);
  router.delete("/:id", auth.authorizations, deleteById);
  router.put("/:id", update);
  return app.use("/api/cat", router);
};

export default catRoute;
