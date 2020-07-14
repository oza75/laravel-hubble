<template>
    <div :class="{[`show--${type}--wrapper`]: true}">
        <div v-html="text"></div>
    </div>
</template>

<script>
    import {smart_substr} from "../../../utils";

    export default {
        name: "index-text-field",
        props: {
            field: {type: Object, required: true},
            value: {default: null},
            type: {default: 'text', type: String},
            limit: {default: null}
        },
        computed: {
            text() {
                if (!this.limit) return this.value;

                return smart_substr(this.value, this.limit)
            }
        }
    }
</script>

<style scoped>

</style>
