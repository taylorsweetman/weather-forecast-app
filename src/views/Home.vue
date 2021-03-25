<template>
  <div class="home">
    <WeatherTable />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
// @ is an alias to /src
import WeatherTable from "@/components/WeatherTable.vue"

export default defineComponent({
  components: {
    WeatherTable
  },
  setup() {
    const state = reactive({
      isCompositionHome: true
    })

    return { ...toRefs(state) }
  }
})
</script>
<style lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
