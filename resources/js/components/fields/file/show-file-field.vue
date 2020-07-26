<template>
    <ul :class="{[`show--file--wrapper`]: true}" >
        <li v-for="file in value" :key="file.name">
            <a :href="file.url" target="_blank">{{file.name}}</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "show-file-field",
        data: () => ({}),
        props: {
            field: {type: Object, required: true},
            value: {default: null},
        },
        computed: {}
    }
</script>

<style scoped>

</style>
