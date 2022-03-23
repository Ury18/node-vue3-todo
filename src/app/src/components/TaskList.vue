<script >
import Task from './Task.vue'


export default {
    components: {
        Task
    },
    emits: ["update"],
    props: {
        tasks: Array
    },
    data() {
        return {
            activeFilter: "all"
        }
    },
    computed: {
        filteredTasks() {
            return this.activeFilter == "all"
                ? this.tasks
                : this.activeFilter == "active"
                    ? this.tasks.filter((task) => task.status == "active")
                    : this.tasks.filter((task) => task.status == "completed")
        }
    },
    methods: {
        update() {
            this.$emit("update")
        },
        setFilter(e) {
            e.preventDefault()
            this.activeFilter = e.target.value
        },
        async clearCompleted(e) {
            e.preventDefault()

            let completedTasks = this.tasks.filter((task) => task.status == "completed")
            let completedTasksIds = completedTasks.map((task) => task.id)
            try {
                let res = await fetch(
                    `http://localhost:3080/api/tasks/`,
                    {
                        method: "DELETE",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(completedTasksIds)
                    }
                )
                if (res.status == 200) {
                    this.$emit("update")
                } else {
                    window.alert("There was an issue that prevented the deletion")
                }
            } catch (e) {
                window.alert("There was an issue that prevented the deletion")
            }
        }
    }
}

</script>

<template>
    <ul v-if="tasks.length > 0">
        <Task v-for="task in filteredTasks" :task="task" :key="task.id" @update="update" />
        <li class="list-options">
            <p>{{ `${tasks.length} items left` }}</p>
            <div class="filters" :active-filter="activeFilter">
                <button @click="setFilter" value="all">All</button>
                <button @click="setFilter" value="active">Active</button>
                <button @click="setFilter" value="completed">Completed</button>
            </div>
            <button @click="clearCompleted" class="clear-completed">Clear Completed</button>
        </li>
    </ul>
    <p v-else class="empty-list">There is no tasks yet</p>
</template>

<style scoped>
ul {
    padding-left: 0;
    list-style: none;
    -webkit-box-shadow: 5px 5px 27px 5px rgba(0, 0, 0, 0.49);
    box-shadow: 5px 5px 27px 5px rgba(0, 0, 0, 0.49);
}

.list-options {
    margin-bottom: 2em;
    display: flex;
    align-items: center;
    padding: 1em 1.5em;
    background-color: var(--color-background-soft);
    border-radius: 0 0 5px 5px;
}

.list-options p,
.list-options button {
    flex: 1;
    color: var(--font-color-line-through);
    font-size: 0.8em;
    background-color: transparent;
    border: transparent;
    outline: transparent;
    padding: 0;
}

button {
    cursor: pointer;
    transition: color 0.2s ease;
}

button:hover {
    color: var(--font-color-hover);
}

.clear-completed {
    text-align: right;
}
.filters {
    flex: 1;
    display: flex;
    text-align: center;
}
.filters button {
    margin: 0 0.5em;
    font-weight: var(--font-weight-bold);
}

.filters button:hover {
    margin: 0 0.5em;
    color: var(--bright-blue);
}

.filters[active-filter="active"] button[value="active"] {
    color: var(--font-color-hover);
}

.filters[active-filter="all"] button[value="all"] {
    color: var(--font-color-hover);
}

.filters[active-filter="completed"] button[value="completed"] {
    color: var(--font-color-hover) !important;
}

.empty-list {
    color: var(--font-color-line-through);
    text-align: center;
}
</style>

