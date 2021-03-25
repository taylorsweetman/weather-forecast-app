<template>
  <div class="weather-table">
    <label>Enter Zip Code</label>
    <br />
    <input v-model="zipCode" @keyup="verifyZip" />
    <p>{{ cityName }}</p>
    <p v-if="currentUvi > 0">Current UV Index: {{ currentUvi }}</p>
    <day-weather
      v-for="day in forecastList"
      :key="day.timestamp"
      :high="day.tempHigh"
      :timestamp="new Date(day.timestamp)"
      :feels-like="day.feelsLike"
      :icon-code="day.iconCode"
      :description="day.description"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { CallResult, DayForecast } from "../common/types"
import DayWeather from "../components/DayWeather.vue"
import axios from "axios"

export default defineComponent({
  components: { DayWeather },
  data() {
    return {
      dataPayload: new CallResult(),
      zipCode: "",
      goodZip: false,
      cityName: "",
      currentUvi: -1,
      forecastList: new Array<DayForecast>()
    }
  },
  watch: {
    goodZip: function(val) {
      if (val) this.fetchData()
    }
  },
  methods: {
    verifyZip() {
      const pattern = new RegExp(/^\d{5}$/)
      if (pattern.test(this.zipCode)) this.goodZip = true
      else this.goodZip = false
    },
    async fetchData() {
      try {
        const result: CallResult = (await axios.get("http://localhost:3000/forecast/" + this.zipCode)).data
        console.log(result)
        this.dataPayload = result
        this.cityName = result.city.name
        this.currentUvi = result.currentUV
        this.forecastList = new Array<DayForecast>()
        for (const nextDay of result.forecastList) {
          this.forecastList.push(nextDay)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style scoped>
.weather-table {
  color: white;
}

input {
  background-color: #00adb5;
  border: none;
  border-radius: 10px;
  text-align: center;
}
</style>
