import { Forecast } from "../../src/common/types"
import axios from "axios"

const END_POINT = "https://api.openweathermap.org/data/2.5/forecast?zip="

// TODO store the secret in an environment variable

export async function fetch5DayForecast(zipCode: string) /*: Promise<Array<Forecast>> */ {
  const API_KEY = process.env.API_KEY
  try {
    const resp = await axios.get(END_POINT + zipCode + "&appid=" + API_KEY)
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
