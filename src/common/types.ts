export class DayForecast {
  tempHigh: number
  tempLow: number
  feelsLike: number
  timestamp: Date
  iconCode: string
  description: string
  humidity: number
  windSpeed: number
  pop: number
  pressure: number
  constructor(
    tempHigh: number,
    tempLow: number,
    feelsLike: number,
    timestamp: Date,
    iconCode: string,
    description: string,
    humidity: number,
    windSpeed: number,
    pop: number,
    pressure: number
  ) {
    this.tempHigh = tempHigh
    this.tempLow = tempLow
    this.feelsLike = feelsLike
    this.timestamp = timestamp
    this.iconCode = iconCode
    this.description = description
    this.humidity = humidity
    this.windSpeed = windSpeed
    this.pop = pop
    this.pressure = pressure
  }
}

export class City {
  name: string
  lat: number
  long: number
  constructor(name?: string, lat?: number, long?: number) {
    this.name = name ? name : ""
    this.lat = lat ? lat : -1
    this.long = long ? long : -1
  }
}

export class FiveDayForecast {
  city: City
  forecastList: Array<DayForecast>
  currentUV: number
  constructor(city?: City, forecastList?: Array<DayForecast>, currentUV?: number) {
    this.city = city ? city : new City()
    this.forecastList = forecastList ? forecastList : []
    this.currentUV = currentUV ? currentUV : -1
  }

  set uvi(uvi: number) {
    this.currentUV = uvi
  }
}
