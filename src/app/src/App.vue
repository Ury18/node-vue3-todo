<script >
import Header from './components/Header.vue'
import NewTask from './components/NewTask.vue'

export default {
  components: {
    Header,
    NewTask
  },

  data() {
    tasks: []
  }
}

</script>

<template>
  <Header />
  <NewTask />
  <main>
  </main>
</template>

<style>
@import "./assets/base.css";
@import "./App.css";
</style>
