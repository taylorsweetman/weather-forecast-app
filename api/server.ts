import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"

import * as forecast from "./controllers/forecast.controller"

dotenv.config()

const app = express()

app.set("port", process.env.SERVER_PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.get("/forecast/:zip", forecast.index)

app.listen(app.get("port"), () => {
  console.log("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"))
})

export default app
