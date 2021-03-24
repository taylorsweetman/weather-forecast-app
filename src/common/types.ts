export class DayForecast {
  temp: string
  feelsLike: string
  timestamp: Date
  constructor(temp: string, feelsLike: string, timestamp: Date) {
    this.temp = temp
    this.feelsLike = feelsLike
    this.timestamp = timestamp
  }
}

export class City {
  name: string
  lat: number
  long: number
  constructor(name: string, lat: number, long: number) {
    this.name = name
    this.lat = lat
    this.long = long
  }
}

export class CallResult {
  city: City
  forecastList: Array<DayForecast>
  constructor(city: City, forecastList: Array<DayForecast>) {
    this.city = city
    this.forecastList = forecastList
  }
}
