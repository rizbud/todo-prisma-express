import { getReasonPhrase } from "http-status-codes";

const Json = (status: number = 200, data: any) => {
  return {
    response: {
      code: status,
      message: getReasonPhrase(status),
    },
    data,
  };
};

export default Json;
