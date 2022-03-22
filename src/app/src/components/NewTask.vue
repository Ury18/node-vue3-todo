<script >
export default {
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
            e.preventDefault()
            this.title = ""
            this.status = "active"
        },
    },
}

</script>

<template>
    <form>
        <button id="status-toggle" :class="status" @click="toggleStatus" />
        <input v-model="title" />
        <button id="clear" @click="clearTask" />
    </form>
</template>

<style scoped>

form {
    margin-top: 2em;
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    padding: 1em 1.5em;
    background-color: var(--color-background-soft);
    border-radius: 5px;
    -webkit-box-shadow: 5px 5px 27px 5px rgba(0, 0, 0, 0.49);
    box-shadow: 5px 5px 27px 5px rgba(0, 0, 0, 0.49);
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

form:hover #clear{
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

#status-toggle.completed {
    background: var(--check-background);
}

#status-toggle.completed:before {
    background: url(src/assets/images/icon-check.svg);
    background-repeat: no-repeat;
    background-position: center;
}

</style>

