export class Forecast {
	temp: string;
	feelsLike: string;
	constructor(temp?: string, feelsLike?: string) {
		this.temp = temp ? temp : '';
		this.feelsLike = feelsLike ? feelsLike : '';
	}
}