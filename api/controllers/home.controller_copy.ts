import { Request, Response } from "express"
import { get5DayForecast } from "../services/open_weather_service"

export const index = async (req: Request, res: Response) => {
  let data = await get5DayForecast(90210, "", "")
  res.send(data)
}
