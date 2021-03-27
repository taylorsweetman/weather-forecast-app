<template>
  <div class="box">
    <img :src="'weather_icons/' + fileName()" alt="weather icon" width="50" height="50" />
    <div class="left">
      <h2 class="small-bottom">{{ weekDay() }}</h2>
      <p class="small-top">{{ description }}</p>
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
    },
    selected: {
      type: Boolean,
      required: true
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
img {
  margin-right: 1%;
}

.box {
  display: flex;
  background-color: #393e46;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  padding: 10px;
  text-decoration: none;
  margin: 1%;
  align-items: center;
}

.box:hover {
  background-color: #00adb5;
  cursor: pointer;
}

.left {
  display: block;
  text-align: left;
}

.right {
  display: block;
  margin-left: auto;
  text-align: right;
}
</style>
