import redis from "redis"
import { FiveDayForecast } from "../../src/common/types"

const redisPort = 6379
var client = redis.createClient(redisPort)

export function putForecast(key: string, val: FiveDayForecast, ttl: number) {
  if (!key || !val.city.name) return
  client.set(key, JSON.stringify(val), err => {
    if (err) console.error(err)
  })
}

// in the case of error, resolves an empty FiveDayForecast
export function getForecast(key: string): Promise<FiveDayForecast> {
  return new Promise<FiveDayForecast>(resolve => {
    client.get(key, (err, rep) => {
      if (err) resolve(new FiveDayForecast())
      else if (rep) {
        const forecast: FiveDayForecast = JSON.parse(rep)
        resolve(forecast)
      } else resolve(new FiveDayForecast())
    })
  })
}
