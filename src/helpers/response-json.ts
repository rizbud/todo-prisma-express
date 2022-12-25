import type { Response } from "express";
import { getReasonPhrase } from "http-status-codes";

const responseJson = (res: Response, status: number = 200, data?: any) => {
  return res.status(status).send({
    response: {
      code: status,
      message: getReasonPhrase(status),
    },
    data,
  });
};

export default responseJson;
