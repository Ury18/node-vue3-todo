<script >
import Header from './components/Header.vue'
import NewTask from './components/NewTask.vue'
import TaskList from './components/TaskList.vue'

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
      console.log("here")
      const res = await fetch(
        "http://localhost:3080/api/tasks"
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
    <NewTask @creation="fetchTasks"/>
    <TaskList :tasks="tasks" @update="fetchTasks"/>
  </main>
</template>

<style>
@import "./assets/base.css";
@import "./App.css";
</style>
