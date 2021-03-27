import { Request, Response } from "express"
import { FiveDayForecast } from "../../src/common/types"
import { fetch5DayForecast, fetchUV } from "../services/open_weather_service"
import { getForecastFromCache, putForecastToCache } from "../services/redis_service"

const DEF_TTL = 1 // 1 hour

// TODO cleanse incoming zip for safety
export const index = async (req: Request, res: Response) => {
  try {
    let forecast = new FiveDayForecast()
    let writeToCache = false

    const zipCode = req.params.zip

    // try to fetch forecast from cache
    try {
      forecast = await getForecastFromCache(zipCode)
    } catch (error) {
      // fetch forecast from API
      forecast = await fetch5DayForecast(zipCode, "metric")
      writeToCache = true
    }

    let uvi = forecast.currentUV
    if (uvi === -1) {
      // api provider has deprecated the upstream call
      // expect failures here soon
      try {
        const { lat, long } = forecast.city
        uvi = await fetchUV(lat, long)
        forecast.uvi = uvi
      } catch (err) {
        console.error(err)
      }
    }

    if (writeToCache) putForecastToCache(zipCode, forecast, DEF_TTL)
    res.status(200).send(forecast)
  } catch (err) {
    if (err.message == 404) res.status(404).send("Bad zipcode")
    else res.status(500).send("Internal Error")
  }
}
