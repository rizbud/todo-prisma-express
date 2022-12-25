import { PrismaClient } from "@prisma/client";
import responseJson from "../helpers/response-json";

import type { Request, Response } from "express";

const prisma = new PrismaClient();

export default class StatusController {
  static async get(req: Request, res: Response) {
    try {
      const statuses = await prisma.status.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          id: "asc",
        },
      });

      responseJson(res, 200, statuses);
    } catch (error) {
      responseJson(res, 500, error);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const status = await prisma.status.create({
        data: {
          name: req.body.name,
        },
        select: {
          id: true,
          name: true,
        },
      });

      responseJson(res, 201, status);
    } catch (error) {
      responseJson(res, 500, error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const find = await prisma.status.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!find) {
        return responseJson(res, 404, { message: "Status not found" });
      }

      const status = await prisma.status.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name: req.body.name,
        },
        select: {
          id: true,
          name: true,
        },
      });

      responseJson(res, 202, status);
    } catch (error) {
      responseJson(res, 500, error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const find = await prisma.status.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!find) {
        return responseJson(res, 404, { message: "Status not found" });
      }

      await prisma.status.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      responseJson(res, 204);
    } catch (error) {
      responseJson(res, 500, error);
    }
  }
}
