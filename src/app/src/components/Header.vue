<script >
import ToggleTheme from './ToggleTheme.vue'

export default {
    components: {
        ToggleTheme
    },
    data() {
        return {
            title: 'TODO'
        }
    }
}

</script>

<template>
    <header>
        <h1>{{title}}</h1>
        <ToggleTheme />
    </header>
</template>

<style scoped>

header {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
}

h1 {
    color: var(--header-font-color);
    font-weight: var(--font-weight-bold);
    letter-spacing: .4em;
}

@media(max-width: 375px) {
    h1 {
        font-size: 1.7em;
    }
}
</style>

