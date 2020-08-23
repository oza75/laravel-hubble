<template>
    <a :href="url" :target="target" class="btn btn-radius btn-normal" :class="{[classes]: true}">
        {{name}}
    </a>
</template>

<script>
    export default {
        name: "table-button",
        props: {
            name: {type: String, required: true},
            url: {type: String, required: true},
            target: {type: String, default: null},
            classes: {type: String, default: ""}
        }
    }
</script>

<style scoped>

</style>
