<template>
  <div class="box">
    <img :src="'weather_icons/' + fileName()" alt="weather icon" width="75" height="75" />
    <div class="left">
      <p>{{ weekDay() }}</p>
      <p>{{ description }}</p>
    </div>
    <div class="right">
      <p>Temp: {{ high }}</p>
      <p>Feels Like: {{ feelsLike }}</p>
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
  margin-right: 2%;
}

.box {
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1%;
  border-radius: 10px;
  padding: 1%;
  background-color: #393e46;
  color: white;
  text-decoration: none;
  width: 50%;
  margin-left: 25%;
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
</style>
