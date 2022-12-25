import express from "express";
import responseJson from "../../helpers/response-json";
import statusRouter from "./status";
import cardRouter from "./card";

const router = express.Router();

router.get("/", (req, res) => {
  responseJson(res, 200, {
    message: "Hello World!",
  });
});

router.use("/status", statusRouter);
router.use("/card", cardRouter);

export default router;
