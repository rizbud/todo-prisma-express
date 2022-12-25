import express from "express";
import responseJson from "../../helpers/response-json";
import statusRouter from "./status";

const router = express.Router();

router.get("/", (req, res) => {
  responseJson(res, 200, {
    message: "Hello World!",
  });
});
router.use("/status", statusRouter);

export default router;
