<script >
const { VITE_API_URL } = import.meta.env

export default {
    emits: ["creation"],
    data() {
        return {
            title: "",
            status: "active"
        }
    },
    methods: {
        toggleStatus(e) {
            e.preventDefault()
            const newStatus = this.status == "active" ? "completed" : "active"
            this.status = newStatus
        },
        clearTask(e) {
            if (e) e.preventDefault()
            this.title = ""
            this.status = "active"
        },
        async submit(e) {
            e.preventDefault();
            let res = await fetch(
                VITE_API_URL + "tasks",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        title: this.title,
                        status: this.status
                    })
                }
            )
            if (res.status == 200) {
                this.clearTask()
                this.$emit("creation")
            } else {
                //Show error popup
            }
        }
    },
}

</script>

<template>
    <form :class="status">
        <button type="submit" @click="submit" />
        <button id="status-toggle" @click="toggleStatus" />
        <input v-model="title" />
        <button id="clear" @click="clearTask" />
    </form>
</template>

<style scoped>
form {
    margin-top: 3em;
    margin-bottom: 2em;
    display: flex;
    align-items: center;
    padding: 1em 1.5em;
    background-color: var(--color-background-soft);
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 24px 5px rgba(0,0,0,0.20);
    box-shadow: 0px 0px 24px 5px rgba(0,0,0,0.20);
}

@media (max-width: 375px) {
    form {
        margin-top: 1em;
        margin-bottom: 1em;
        padding: 0.7em 1em;
    }
}

form button[type="submit"] {
    display: none;
}

form input {
    flex: 1;
    color: var(--font-color);
    font-size: var(--font-size);
    background-color: transparent;
    border: transparent;
    outline: transparent;
    padding: 0;
    overflow: hidden;
}

form:hover #clear {
    opacity: 1;
}

#clear {
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
    opacity: 0;
    transition: all 0.2s ease;
}

#clear:hover {
    transform: scale(1.4);
}

#status-toggle {
    margin-right: 1em;
    background: var(--font-color-line-through);
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

    #clear {
        width: 18px;
        height: 18px;
    }
}

form.completed input {
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

