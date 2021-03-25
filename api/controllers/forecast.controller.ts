import { Request, Response } from "express"
import { fetch5DayForecast, fetchUV } from "../services/open_weather_service"

export const index = async (req: Request, res: Response) => {
  try {
    let forecastData = await fetch5DayForecast(req.params.zip, "metric")
    const { lat, long } = forecastData.city
    const uvi = await fetchUV(lat, long)
    forecastData.currentUV = uvi
    res.status(200).send(forecastData)
  } catch (err) {
    if (err.message == 404) res.status(404).send("Bad zipcode")
    else res.status(500).send("Internal Error")
  }
}
