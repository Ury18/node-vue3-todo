<script >
const { VITE_API_URL } = import.meta.env
import axios from "axios"

export default {
    emits: ["update"],
    props: {
        task: Object
    },
    data() {
        return {
            title: "",
            status: "",
            id: ""
        }
    },
    methods: {
        async toggleStatus(e) {
            e.preventDefault()
            const newStatus = this.status == "active" ? "completed" : "active"
            try {
                let res = await axios.put(
                    VITE_API_URL + `tasks/${this.id}`,
                    {
                        status: newStatus
                    }
                )
                .catch((error => {
                    return error.toJSON()
                }))

                if (res.status == 200) {
                    this.$emit("update")
                    this.status = newStatus
                } else {
                    window.alert("There was an issue that prevented the task from being updated")
                }
            } catch (e) {
                window.alert("There was an issue that prevented the task from being updated")
            }
        },
        async deleteTask(e) {
            e.preventDefault()
            try {

                let res = await axios.delete(VITE_API_URL + `tasks/${this.id}`)
                .catch((error => {
                    return error.toJSON()
                }))

                if (res.status == 200) {
                    this.$emit("update")
                } else {
                    this.$emit("update")
                    window.alert("There was an issue that prevented the task from being deleted")
                }
            } catch (e) {
                this.$emit("update")
                window.alert("There was an issue that prevented the task from being deleted")
            }
        },
    },
    mounted(e) {
        this.title = this.task.title
        this.status = this.task.status
        this.id = this.$.vnode.key
    }
}

</script>

<template>
    <li>
        <form :class="status">
            <button id="status-toggle" @click="toggleStatus" />
            <p>{{ title }}</p>
            <button id="delete" @click="deleteTask" />
        </form>
    </li>
</template>

<style scoped>
form {
    display: flex;
    align-items: center;
    padding: 1em 1.5em;
    background-color: var(--color-background-soft);
    border-bottom: 1px solid var(--font-color-line-through);
}

@media (max-width: 375px) {
    form {
        padding: 0.7em 1em;
    }
}

li:first-child form {
    border-radius: 5px 5px 0 0;
}

form button[type="submit"] {
    display: none;
}

form p {
    flex: 1;
    color: var(--font-color);
    font-size: var(--font-size);
    background-color: transparent;
    border: transparent;
    outline: transparent;
    padding: 0;
    overflow: hidden;
}

form:hover #delete {
    opacity: 1;
}

#delete {
    margin-left: 1em;
    width: 25px;
    height: 25px;
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    border: none;
    background-image: url(src/assets/images/icon-cross.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: all 0.2s ease;
}

#delete:hover {
    transform: scale(1.4);
}

#status-toggle {
    margin-right: 1em;
    background: var(--check-background-empty);
    width: 30px;
    height: 30px;
    position: relative;
    border-radius: 50%;
    border: none;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

#status-toggle:hover {
    background: var(--check-background);
}

#status-toggle:before {
    content: "";
    background: var(--color-background-soft);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin: auto;
}

@media (max-width: 375px) {
    #status-toggle {
        width: 25px;
        height: 25px;
    }
    #status-toggle:before {
        width: 23px;
        height: 23px;
    }

    #delete {
        width: 18px;
        height: 18px;
    }
}

form.completed p {
    text-decoration: line-through;
    color: var(--font-color-line-through);
}

form.completed #status-toggle {
    background: var(--check-background);
}

form.completed #status-toggle:before {
    background: url(src/assets/images/icon-check.svg);
    background-repeat: no-repeat;
    background-position: center;
}
</style>

