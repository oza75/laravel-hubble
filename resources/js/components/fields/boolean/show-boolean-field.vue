<template>
    <div class="boolean-state--wrapper" :class="{[classes]: true} ">
        <div class="boolean-state" :class="{active: value}"></div>
        <span v-html="text"></span>
    </div>
</template>

<script>
    import {DetailsMixins} from "../mixins";

    export default {
        name: "show-boolean-field",
        props: {
            field: {type: Object, required: true},
            value: {default: null},
            checkedText: {type: String, default: null},
            unCheckedText: {type: String, default: null},
        },
        mixins: [DetailsMixins],
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
