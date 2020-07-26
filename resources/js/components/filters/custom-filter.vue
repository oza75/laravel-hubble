<template>
    <div>
        Display your custom filter
    </div>
</template>

<script>
    export default {
        name: "custom-filter",
        props: {
            multiple: {type: Boolean, default: false},
            options: {type: Array, required: true},
            name: {type: String, required: true},
            valueKey: {type: String, required: true},
            textKey: {type: String, required: true},
            value: {default: undefined},
        }
    }
</script>

<style scoped>

</style>
