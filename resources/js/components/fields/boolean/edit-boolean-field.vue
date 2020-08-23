<template>
    <div>
        <label class="fake-radio--container" :class="{active: isActive, [classes]: true}">
            <input type="hidden" :name="field.name" v-bind="inputAttrs"  :value="0">
            <input type="checkbox" :name="field.name" v-bind="inputAttrs" :value="1" :id="field.name" @input="toggle" :checked="isActive">
            <span class="fake-radio--wrapper">
                <span class="fake-radio"></span>
            </span>
        </label>
        <input-errors :errors="errors"/>
    </div>
</template>

<script>
    import {EditMixin} from "../mixins";

    export default {
        name: "edit-boolean-field",
        props: {
            type: {type: String, default: 'text'}
        },
        mixins: [EditMixin],
        computed: {
            isActive() {
                return this.value;
            }
        },
        methods: {
            toggle(value) {
                this.$emit('input', !this.value)
            }
        }
    }
</script>

<style scoped>

</style>
