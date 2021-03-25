<template>
  <div>
    <p>{{ timestamp }} --- {{ high }} --- {{ low }} --- {{ feelsLike }} ---</p>
    <img :src="'weather_icons/' + fileName()" alt="weather icon" width="75" height="75" />
    <p>{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import data from "../common/weather-codes-icon-map.json"

export default defineComponent({
  props: {
    high: {
      type: Number,
      required: true
    },
    low: {
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
      const iconMap: { [key: string]: string } = data
      return iconMap[this.iconCode]
    }
  }
})
</script>

<style scoped>
p {
  color: white;
}
</style>
