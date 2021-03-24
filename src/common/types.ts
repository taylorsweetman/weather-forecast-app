export class DayForecast {
  tempHigh: number
  tempLow: number
  feelsLike: number
  timestamp: Date
  iconCode: string
  description: string
  constructor(
    tempHigh: number,
    tempLow: number,
    feelsLike: number,
    timestamp: Date,
    iconCode: string,
    description: string
  ) {
    this.tempHigh = tempHigh
    this.tempLow = tempLow
    this.feelsLike = feelsLike
    this.timestamp = timestamp
    this.iconCode = iconCode
    this.description = description
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
  currentUV: number
  constructor(city: City, forecastList: Array<DayForecast>, currentUV?: number) {
    this.city = city
    this.forecastList = forecastList
    this.currentUV = currentUV ? currentUV : -1
  }

  set uvi(uvi: number) {
    this.currentUV = uvi
  }
 
}
