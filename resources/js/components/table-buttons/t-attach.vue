<template>
    <div>
        <button class="btn btn-radius btn-normal" :class="{[classes]: true}">
            {{name}}
        </button>
    </div>

</template>

<script>
    export default {
        name: "table-button-attach",
        props: {
            name: {type: String, required: true},
            classes: {type: String, default: ""}
        }
    }
</script>

<style scoped>

</style>
