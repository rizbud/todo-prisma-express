import express from "express";
import { PrismaClient } from "@prisma/client";
import Json from "../../helpers/response-json";
import { objectFormatter } from "../../helpers/object-formatter";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const statuses = await prisma.status.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    res.send(Json(200, statuses));
  } catch (error) {
    res.send(Json(500, error));
  }
});

export default router;
