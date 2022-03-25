<script >
import Header from './components/Header.vue'
import NewTask from './components/NewTask.vue'
import TaskList from './components/TaskList.vue'
const { VITE_API_URL } = import.meta.env

export default {
  components: {
    Header,
    NewTask,
    TaskList
  },
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    async fetchTasks() {
      const res = await fetch(
        VITE_API_URL + "tasks"
      )
      this.tasks = await res.json()
    }
  },
  mounted() {
    this.fetchTasks()
  }

}

</script>

<template>
  <Header />
  <main>
    <NewTask @creation="fetchTasks" />
    <TaskList :tasks="tasks" @update="fetchTasks" />
  </main>
</template>

<style>
@import "./assets/base.css";
@import "./App.css";
</style>
