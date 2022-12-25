import express from "express";
import CardController from "../../controllers/card-controller";

const router = express.Router();

router.get("/", CardController.get);
router.get("/:id", CardController.getOne);
router.post("/", CardController.create);
router.put("/:id", CardController.update);
router.delete("/:id", CardController.delete);

export default router;
