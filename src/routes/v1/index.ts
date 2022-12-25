import express from "express";
import Json from "../../helpers/response-json";
import statusRouter from "./status";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(Json(200, { message: "Hello World!" }));
});
router.use("/status", statusRouter);

export default router;
