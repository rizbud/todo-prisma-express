import express from "express";
import Env from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import Json from "./helpers/response-json";

import routesV1 from "./routes";

Env.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    Json(200, {
      message: "Hello World!",
    })
  );
});

app.use("/api", routesV1);

app.listen(port, () => {
  console.log("Server running on port 3000");
});
