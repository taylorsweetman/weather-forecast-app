import redis from "redis"
import { FiveDayForecast } from "../../src/common/types"

const redisPort = 6379
var client = redis.createClient(redisPort)

export function putForecastToCache(key: string, val: FiveDayForecast, ttlHrs: number) {
  if (!key || !val.city.name) return
  const ttlSec = ttlHrs * 60 * 60
  const serialVal = JSON.stringify(val)
  client.set(key, serialVal, "EX", ttlSec, err => {
    if (err) console.error(err)
  })
}

// in the case of error, resolves a null
export function getForecastFromCache(key: string): Promise<FiveDayForecast> {
  return new Promise<FiveDayForecast>((resolve, reject) => {
    client.get(key, (err, rep) => {
      if (err) reject(err)

      if (rep) {
        resolve(JSON.parse(rep))
      } else {
        reject("no result")
      }
    })
  })
}