<template>
  <div>
    {{ timestamp }} --- {{ high }} --- {{ low }} --- {{ feelsLike }} ---
    <img src="../assets/weather_icons/art_clear.png" /> ---
    {{ description }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import mapping from "../common/weather-codes-icon-map.json"

export default defineComponent({
  data() {
    return { testMap: mapping }
  },
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
  }
})
</script>
