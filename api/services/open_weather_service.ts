import { City, DayForecast, CallResult } from "../../src/common/types"
import axios, { AxiosResponse } from "axios"

// define constants
const END_POINT = "https://api.openweathermap.org/data/2.5/"
const FC_ROUTE = "forecast"
const UV_ROUTE = "uvi"
const RESULTS_PER_DAY = 24 / 3

export async function fetch5DayForecast(zipCode: string, units: string): Promise<CallResult> {
  const apiKey = process.env.API_KEY
  try {
    const resp = await axios.get(END_POINT + FC_ROUTE + "?zip=" + zipCode + "&appid=" + apiKey + "&units=" + units)
    return parseForecastResp(resp)
  } catch (err) {
    if (err.response) throw new Error(err.response.status)
    else if (err.request) throw new Error(err.response)
    else throw new Error(err)
  }
}

export async function fetchUV(lat: number, long: number): Promise<number> {
  const apiKey = process.env.API_KEY
  try {
    const resp = await axios.get(END_POINT + UV_ROUTE + "?lat=" + lat + "&lon=" + long + "&appid=" + apiKey)
    return resp.data.value
  } catch (err) {
    if (err.response) throw new Error(err.response.status)
    else if (err.request) throw new Error(err.response)
    else throw new Error(err)
  }
}

function parseForecastResp(resp: AxiosResponse<any>): CallResult {
  try {
    const cityData = resp.data.city
    const { name, coord } = cityData
    const { lat, lon } = coord
    const queriedCity = new City(name, lat, lon)

    let forecasts: Array<DayForecast> = []

    // iterate the list and push each 8th element
    // improvement idea: take every measurement from the incoming data, and track the highest high, lowest low, and highest POP
    resp.data.list.forEach((forecast: any, idx: number) => {
      if (idx % RESULTS_PER_DAY === 0) {
        const timestamp = new Date(forecast.dt * 1000)
        const pop = forecast.pop
        const { temp_max, temp_min, feels_like, humidity, pressure } = forecast.main
        const { icon, main } = forecast.weather[0]
        const { speed } = forecast.wind
        const nextDay = new DayForecast(temp_max, temp_min, feels_like, timestamp, icon, main, humidity, speed, pop, pressure)
        forecasts.push(nextDay)
      }
    })

    return new CallResult(queriedCity, forecasts)
  } catch (err) {
    throw new Error(err)
  }
}
