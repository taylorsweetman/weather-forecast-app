<template>
  <!-- improvement idea: have a toggle to flip between celcius and fahrenheit -->
  <div class="weather-table">
    <p>Enter Zip Code</p>
    <input v-model="zipCode" @keyup="verifyZip" :class="{ 'bad-input': !partialZip && !fullZip }" />
    <p class="small-bottom">{{ dataPayload.city.name }}</p>
    <p class="small-top" v-if="dataPayload.currentUV > 0">Current UV Index: {{ dataPayload.currentUV }}</p>
    <day-weather
      v-for="(day, idx) in dataPayload.forecastList"
      :key="idx"
      :day-info="day"
      :selected="stateList[idx]"
      @click="selectDay(idx)"
    />
    {{ errorMsg }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { FiveDayForecast } from "../common/types"
import DayWeather from "../components/DayWeather.vue"
import axios from "axios"

export default defineComponent({
  components: { DayWeather },
  data() {
    return {
      dataPayload: new FiveDayForecast(),
      zipCode: "",
      partialZip: true,
      fullZip: false,
      stateList: [false, false, false, false, false],
      errorMsg: ""
    }
  },
  watch: {
    fullZip: function(val) {
      if (val) this.fetchData()
    }
  },
  methods: {
    verifyZip() {
      const partialPattern = new RegExp(/^\d{0,4}$/)
      const fullPattern = new RegExp(/^\d{5}$/)
      this.partialZip = partialPattern.test(this.zipCode)
      this.fullZip = fullPattern.test(this.zipCode)
    },
    async fetchData() {
      this.dataPayload = new FiveDayForecast()
      this.errorMsg = ""
      this.stateList = [false, false, false, false, false]
      try {
        const result = (await axios.get("http://localhost:3000/forecast/" + this.zipCode)).data

        this.dataPayload = result
      } catch (err) {
        if (err.response.status == 404) this.errorMsg = "No Results Found. Did you enter a real ZIP Code?"
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

input {
  background-color: #00adb5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: none;
  border-radius: 10px;
  text-align: center;
  width: 40%;
  max-width: 150px;
  height: 2rem;
}

.bad-input {
  background-color: salmon;
}
</style>
