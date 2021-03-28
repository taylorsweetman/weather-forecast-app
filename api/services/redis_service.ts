import redis from "redis"
import { FiveDayForecast } from "../../src/common/types"

const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
const host = process.env.REDIS_HOST ? process.env.REDIS_HOST : "127.0.0.1"
const client = redis.createClient(port, host)

export function putForecastToCache(key: string, val: FiveDayForecast, ttlHrs: number) {
  if (!key || !val.city.name) return
  const ttlSec = ttlHrs * 60 * 60
  const serialVal = JSON.stringify(val)
  client.set(key, serialVal, "EX", ttlSec, err => {
    if (err) console.error(err)
  })
}

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
