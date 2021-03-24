export class DayForecast {
  temp: string
  feelsLike: string
  timestamp: Date
  iconCode: string
  constructor(temp: string, feelsLike: string, timestamp: Date, iconCode: string) {
    this.temp = temp
    this.feelsLike = feelsLike
    this.timestamp = timestamp
    this.iconCode = iconCode
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
