import express from "express";
import StatusController from "../../controllers/status-controller";

const router = express.Router();

router.get("/", StatusController.get);
router.post("/", StatusController.create);
router.put("/:id", StatusController.update);
router.delete("/:id", StatusController.delete);

export default router;
