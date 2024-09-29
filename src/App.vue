<template>
  <DateCalculator />
</template>

<script>
import DateCalculator from './components/DateCalculator.vue'

export default {
  name: 'App',
  components: {
    DateCalculator
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px; /* 可根据需要调整 */
}
</style>
