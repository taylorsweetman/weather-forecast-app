<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>

    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li>
        <a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a>
      </li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
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
