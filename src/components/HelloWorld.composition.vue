<template>
  <div class="hello">
    <label>Enter Zip Code</label>
    <br />
    <input v-model="zipCode" />
    <br />
    <button @click="testCall()">Click Me</button>
    <br />
    <br />
    {{ zipCode }}
    <br />
    {{ test }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      test: "",
      zipCode: ""
    }
  },
  methods: {
    async testCall() {
      try {
        const resp = await axios.get("http://localhost:3000/forecast/" + this.zipCode)
        console.log(resp)
        this.test = resp.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
