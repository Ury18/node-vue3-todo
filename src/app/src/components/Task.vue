<script >
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
                let res = await fetch(
                    `http://localhost:3080/api/tasks/${this.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            status: newStatus
                        })
                    }
                )
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

                let res = await fetch(
                    `http://localhost:3080/api/tasks/${this.id}`,
                    {
                        method: "DELETE",
                    }
                )
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

form:first-child {
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
    filter: grayscale(100%) invert(1);
}

#status-toggle {
    margin-right: 1em;
    background: var(--very-dark-gray-blue);
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
    transition: filter 0.2s ease;
}

#status-toggle:hover {
    background: var(--check-background);
}

#status-toggle:before {
    content: "";
    background: hsl(235, 21%, 11%);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin: auto;
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

