<template>
  <div class="box">
    <p>{{ weekDay() }}</p>
    <p>Temp: {{ high }}</p>
    <p>Feels Like: {{ feelsLike }}</p>
    <img :src="'weather_icons/' + fileName()" alt="weather icon" width="75" height="75" />
    <p>{{ description }}</p>
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
</style>
