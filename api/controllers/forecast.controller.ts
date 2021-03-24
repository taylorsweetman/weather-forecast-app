import { Request, Response } from "express"
import { fetch5DayForecast } from "../services/open_weather_service"

export const index = async (req: Request, res: Response) => {
  let data = await fetch5DayForecast(req.params.zip)
  res.send(data)
}
