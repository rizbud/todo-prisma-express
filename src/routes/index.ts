import express from "express";
import Json from "../helpers/response-json";
import apiV1 from "./v1";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(Json(200, { message: "Hello World!" }));
});

router.use("/v1", apiV1);

export default router;
