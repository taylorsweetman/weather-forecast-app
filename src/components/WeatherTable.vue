<template>
  <div class="weather-table">
    <p>Enter Zip Code</p>
    <input v-model="zipCode" @keyup="verifyZip" />
    <p class="small-bottom">{{ cityName }}</p>
    <p class="small-top" v-if="currentUvi > 0">Current UV Index: {{ currentUvi }}</p>
    <day-weather
      v-for="(day, idx) in forecastList"
      :key="day.timestamp"
      :high="day.tempHigh"
      :timestamp="new Date(day.timestamp)"
      :feels-like="day.feelsLike"
      :icon-code="day.iconCode"
      :description="day.description"
      :pop="day.pop"
      :humidity="day.humidity"
      :wind-speed="day.windSpeed"
      :pressure="day.pressure"
      :selected="stateList[idx]"
      @click="selectDay(idx)"
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
      forecastList: new Array<DayForecast>(),
      stateList: [false, false, false, false, false],
      mobileMode: false
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
        let result: CallResult
        if (this.mobileMode) result = (await axios.get("http://192.168.2.34:3000/forecast/" + this.zipCode)).data
        else result = (await axios.get("http://localhost:3000/forecast/" + this.zipCode)).data

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
    },
    selectDay(idx: number) {
      this.stateList = this.stateList.map((active, listIdx) => {
        if (idx === listIdx) return !active
        else return false
      })
    }
  }
})
</script>

<style scoped>
.weather-table {
  color: white;
}

/* TODO refactor */
.small-bottom {
  margin-bottom: 1px;
}

/* TODO refactor */
.small-top {
  margin-top: 1px;
}

div {
  margin-top: 5px;
}

input {
  background-color: #00adb5;
  border: none;
  border-radius: 10px;
  text-align: center;
}
</style>
