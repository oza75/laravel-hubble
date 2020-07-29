<template>
    <ul class="errors-messages">
        <li v-for="(err,k) in errors" :key="k">
            <p  v-html="err" class="error"></p>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "input-errors",
        props: {
            errors: {type: Array, required: true}
        }
    }
</script>

<style scoped>

</style>
