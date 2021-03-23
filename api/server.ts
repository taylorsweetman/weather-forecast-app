import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import * as home from "./controllers/home.controller";
import * as home2 from "./controllers/home.controller_copy";

dotenv.config();

const app = express();

app.set("port", process.env.SERVER_PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", home.index);
app.get("/test", home2.index);

app.listen(app.get("port"), () => {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

export default app;
