<template>
  <div class="topnav">
    <h1>Weather Forecast App</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({})
</script>

<style scoped>
h1 {
  color: white;
}

.topnav {
  /* background-color: #222831; */
  background-color: #393e46;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 40px;
  width: 50%;
  margin-left: 25%;
}

/* Style the links inside the navigation bar */
.topnav .box {
  padding: 14px 16px;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav .box:hover {
  background-color: #eeeeee;
  color: black;
  cursor: pointer;
}
</style>
