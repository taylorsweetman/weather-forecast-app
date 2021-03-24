import { City, DayForecast, CallResult } from "../../src/common/types"
import axios from "axios"

const END_POINT = "https://api.openweathermap.org/data/2.5/forecast?zip="
const RESULTS_PER_DAY = 24 / 3

// TODO store the secret in an environment variable

export async function fetch5DayForecast(zipCode: string) /*: Promise<Array<Forecast>> */ {
  const API_KEY = process.env.API_KEY
  try {
    const resp = await axios.get(END_POINT + zipCode + "&appid=" + API_KEY + "&units=metric")

    const cityData = resp.data.city
    const { name, coord } = cityData
    const { lat, lon } = coord
    const queriedCity = new City(name, lat, lon)

    let forecasts: Array<DayForecast> = []

    resp.data.list.forEach((forecast: any, idx: number) => {
      if (idx % RESULTS_PER_DAY === 0) {
        const timestamp = new Date(forecast.dt * 1000)
        const { temp, feels_like } = forecast.main
        const { icon } = forecast.weather[0]
        const nextDay = new DayForecast(temp, feels_like, timestamp, icon)
        forecasts.push(nextDay)
      }
    })

    const resultData = new CallResult(queriedCity, forecasts)
    return resultData
  } catch (error) {
    return error
  }

  /*
	const result = [];
	result.push(new Forecast());
	return result;
    */
}
