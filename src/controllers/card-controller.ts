import responseJson from "../helpers/response-json";
import prismaClient from "../helpers/prisma-client";

import type { Request, Response } from "express";

export default class CardController {
  static async get(req: Request, res: Response) {
    const { statusId } = req.query || {};

    if (!statusId) {
      return responseJson(res, 400, { message: "Status ID is required" });
    }

    const status = await prismaClient.status.findUnique({
      where: {
        id: Number(statusId),
      },
    });

    if (!status) {
      return responseJson(res, 404, { message: "Status not found" });
    }

    try {
      const cards = await prismaClient.card.findMany({
        where: {
          statusId: Number(statusId),
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      console.log(cards);

      responseJson(res, 200, cards);
    } catch (error) {
      responseJson(res, 500, error);
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const card = await prismaClient.card.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!card) {
        return responseJson(res, 404, { message: "Card not found" });
      }

      responseJson(res, 200, card);
    } catch (error) {
      responseJson(res, 500, error);
    }
  }

  static async create(req: Request, res: Response) {
    const status = await prismaClient.status.findUnique({
      where: {
        id: Number(req.body.statusId),
      },
    });

    if (!status) {
      return responseJson(res, 404, { message: "Status not found" });
    }

    try {
      const card = await prismaClient.card.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          statusId: req.body.statusId,
        },
      });

      responseJson(res, 201, card);
    } catch (error) {
      responseJson(res, 500, error);
    }
  }

  static async update(req: Request, res: Response) {
    const { name, description, statusId } = req.body || {};

    const status = await prismaClient.status.findUnique({
      where: {
        id: Number(statusId),
      },
    });

    if (!status) {
      return responseJson(res, 404, { message: "Status not found" });
    }

    try {
      const find = await prismaClient.card.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!find) {
        return responseJson(res, 404, { message: "Card not found" });
      }

      const card = await prismaClient.card.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name: name,
          description: description,
          statusId: statusId,
          completedAt: statusId === 4 ? new Date() : null,
        },
      });

      responseJson(res, 200, card);
    } catch (error) {
      responseJson(res, 500, error);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const find = await prismaClient.card.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

      if (!find) {
        return responseJson(res, 404, { message: "Card not found" });
      }

      const card = await prismaClient.card.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      responseJson(res, 200, card);
    } catch (error) {
      responseJson(res, 500, error);
    }
  }
}
