<script >
const { VITE_API_URL } = import.meta.env
import axios from "axios"
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
      const res = await axios(
        VITE_API_URL + "tasks"
      )
      .catch((error=> {
          return error.toJSON()
      }))

      if (res.status == 200) {
        this.tasks = await res.data
      } else {
        window.alert("Tasks could not be retreived")
      }
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
