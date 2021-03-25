<template>
  <div class="home">
    <TopBar />
    <WeatherTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import WeatherTable from "@/components/WeatherTable.vue"
import TopBar from "@/components/TopBar.vue"

export default defineComponent({
  components: {
    WeatherTable,
    TopBar
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
