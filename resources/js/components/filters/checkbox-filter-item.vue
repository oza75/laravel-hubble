<template>
    <div class="checkbox--filter--item" @click="input">
        <slot name="display" v-bind="{item}">
            <span>{{item[textKey]}}</span>
        </slot>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
             xmlns="http://www.w3.org/2000/svg" v-if="isNested">
            <path
                d="M10.7373 20.7375L16.4623 15L10.7373 9.2625L12.4998 7.5L19.9998 15L12.4998 22.5L10.7373 20.7375Z"
                fill="currentColor"/>
        </svg>
        <span class="fake-checkbox" :class="{selected: isActive}" v-if="!isNested"></span>
    </div>
</template>

<script>
    export default {
        name: "checkbox-filter-item",
        props: {
            valueKey: {type: String, required: true},
            textKey: {type: String, required: true},
            item: {required: true, type: Object},
            isActive: {default: false, type: Boolean},
            isNested: {default: false, type: Boolean},
        },
        methods: {
            input() {
                this.$emit(this.isNested ? 'select' : 'input', this.item)
            }
        }
    }
</script>

<style scoped>

</style>
