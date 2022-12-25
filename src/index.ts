import express from "express";
import Env from "dotenv";

Env.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
