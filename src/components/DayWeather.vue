<template>
  <div @click="selected = !selected" class="box">
    <img :src="'weather_icons/' + fileName()" alt="weather icon" width="50" height="50" />
    <div class="left">
      <p>{{ weekDay() }}</p>
      <p>{{ description }}</p>
    </div>
    <div class="right">
      <p>Temp: {{ high.toFixed(1) }} &#730;C</p>
      <p>Feels Like: {{ feelsLike.toFixed(1) }} &#730;C</p>
      <div v-show="selected">
        <p>Humidity: {{ humidity }} %</p>
        <p>Wind Speed: {{ windSpeed }} m/s</p>
        <p>Chance of Rain: {{ pop }} %</p>
        <p>Pressure: {{ pressure }} hPa</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import iconData from "../mappings/weather-codes-icon-map.json"
import daysOfWeek from "../mappings/days-of-week-map.json"

export default defineComponent({
  props: {
    high: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    },
    feelsLike: {
      type: Number,
      required: true
    },
    iconCode: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    pop: {
      type: Number,
      required: true
    },
    humidity: {
      type: Number,
      required: true
    },
    windSpeed: {
      type: Number,
      required: true
    },
    pressure: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selected: false
    }
  },
  methods: {
    fileName(): string {
      const iconMap: { [key: string]: string } = iconData
      return iconMap[this.iconCode]
    },
    weekDay(): string {
      const daysMap: { [key: string]: string } = daysOfWeek
      return daysMap[this.timestamp.toString().slice(0, 3)]
    }
  }
})
</script>

<style scoped>
p {
  color: white;
}

img {
  margin-top: 2%;
  margin-right: 2%;
}

.box {
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  padding: 10px;
  background-color: #393e46;
  color: white;
  text-decoration: none;
  width: 30%;
  margin: 1%;
  margin-left: 35%;
}

.left {
  display: block;
  margin-right: auto;
  text-align: left;
}

.right {
  display: block;
  margin-left: auto;
  text-align: right;
}

.box:hover {
  background-color: #00adb5;
  cursor: pointer;
}
</style>
