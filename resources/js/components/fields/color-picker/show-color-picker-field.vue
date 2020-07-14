<template>
    <div class="show-color-picker--wrapper">
        <div class="color" :style="`background-color: ${value}`" v-if="!useHex"></div>
        <div v-else>{{value}}</div>
    </div>
</template>

<script>
    export default {
        name: "show-color-picker-field",
        props: {
            field: {type: Object, required: true},
            value: {default: null},
            useHex: {default: false, type: Boolean}
        }
    }
</script>

<style scoped>

</style>
