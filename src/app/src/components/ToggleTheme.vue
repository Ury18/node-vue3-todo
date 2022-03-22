<script >

export default {
    data() {
        return {
            currentTheme: ''
        }
    },
    mounted() {
        const theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light-mode"
        this.setTheme(theme)
    },
    methods: {
        toggleTheme() {
            const newTheme = this.currentTheme == "light-mode" ? "dark-mode" : "light-mode"
            this.setTheme(newTheme)
        },
        setTheme(newTheme) {
            this.currentTheme = newTheme
            localStorage.setItem("theme", newTheme)
            document.documentElement.className = newTheme
        }
    },
}

</script>

<template>
    <button @click="toggleTheme">{{ currentTheme }}</button>
</template>


<style scoped>
button {
    background-image: var(--toggle-theme-image);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: transparent;
    width: 30px;
    height: 30px;
    color: transparent;
    outline: none;
    border: navajowhite;
    cursor: pointer;
    transition: transform 0.2s ease;
}

button:hover {
    transform: scale(1.2);
}
</style>
