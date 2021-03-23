import { Forecast } from "../../src/common/types"
import axios from "axios"

const END_POINT = "https://api.openweathermap.org/data/2.5/forecast?zip="

// TODO store the secret in an environment variable

export async function get5DayForecast(
  zipCode: number,
  secret: string,
  countryCode?: string
) /*: Promise<Array<Forecast>> */ {
  try {
    let resp = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=xxx"
    )
    return resp.data
  } catch (error) {
    return error
  }

  /*
	const result = [];
	result.push(new Forecast());
	return result;
    */
}
