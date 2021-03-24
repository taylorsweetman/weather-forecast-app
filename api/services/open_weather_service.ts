import { City, DayForecast, CallResult } from "../../src/common/types"
import axios from "axios"

const END_POINT = "https://api.openweathermap.org/data/2.5/forecast?zip="
const RESULTS_PER_DAY = 24 / 3

export async function fetch5DayForecast(zipCode: string) {
  const API_KEY = process.env.API_KEY
  try {
    const resp = await axios.get(END_POINT + zipCode + "&appid=" + API_KEY + "&units=metric")
    return parseForecastResp(resp)
  } catch (err) {
    // TODO reject the promise in the catch
    console.error(err)
  }
}

// TODO, can I improve on the any below?
function parseForecastResp(resp: any) {
  try {
    const cityData = resp.data.city
    const { name, coord } = cityData
    const { lat, lon } = coord
    const queriedCity = new City(name, lat, lon)

    let forecasts: Array<DayForecast> = []

    resp.data.list.forEach((forecast: any, idx: number) => {
      if (idx % RESULTS_PER_DAY === 0) {
        const timestamp = new Date(forecast.dt * 1000)
        const { temp_max, temp_min, feels_like } = forecast.main
        const { icon, main } = forecast.weather[0]
        const nextDay = new DayForecast(temp_max, temp_min, feels_like, timestamp, icon, main)
        forecasts.push(nextDay)
      }
    })

    return new CallResult(queriedCity, forecasts)
  } catch (err) {
    throw new Error(err)
  }
}
