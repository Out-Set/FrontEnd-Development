<template>
  <!-- <router-link to="/home">Home</router-link> -->
  <router-view></router-view>
  <!-- <ScheduleTask/>
  <cronLogs/> -->
</template>

<script>
// import ScheduleTask from './components/ScheduleTask.vue';
// import cronLogs from './components/cronLogs.vue';

export default {
  name: 'App',
  components: {
    // ScheduleTask,
    // cronLogs
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
}
</style>
