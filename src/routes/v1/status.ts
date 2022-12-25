import express from "express";
import { PrismaClient } from "@prisma/client";
import StatusController from "../../controllers/status-controller";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", StatusController.get);
router.post("/", StatusController.create);
router.put("/:id", StatusController.update);
router.delete("/:id", StatusController.delete);

export default router;
