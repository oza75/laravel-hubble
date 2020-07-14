<template>
    <div class="boolean-state--wrapper">
        <div class="boolean-state" :class="{active: value}"></div>
        <span v-html="text"></span>
    </div>
</template>

<script>
    export default {
        name: "show-boolean-field",
        props: {
            field: {type: Object, required: true},
            value: {default: null},
            checkedText: {type: String, default: null},
            unCheckedText: {type: String, default: null},
        },
        computed: {
            text() {
                if (this.value) return this.checkedText;

                return this.unCheckedText;
            }
        }
    }
</script>

<style scoped>

</style>
