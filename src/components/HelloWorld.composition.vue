<template>
  <div class="hello">
    <label>Enter Zip Code</label>
    <br />
    <input v-model="zipCode" @keyup="verifyZip" />
    <br />
    <br />
    {{ cityName }}
    <div v-if="currentUvi > 0">Current UV Index: {{ currentUvi }}</div>
    <br />
    <br />
    {{ dataPayload }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { CallResult } from "../common/types"
import axios from "axios"

export default defineComponent({
  data() {
    return {
      dataPayload: new CallResult(),
      zipCode: "",
      goodZip: false,
      cityName: "",
      currentUvi: -1
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
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
