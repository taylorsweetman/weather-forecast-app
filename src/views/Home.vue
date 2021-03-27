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
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media only screen and (min-width: 540px) {
  .home {
    margin-right: 10%;
    margin-left: 10%;
  }
}

@media only screen and (min-width: 1000px) {
  .home {
    margin-right: 15%;
    margin-left: 15%;
  }
}

@media only screen and (min-width: 2000px) {
  .home {
    margin-right: 25%;
    margin-left: 25%;
  }
}

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
