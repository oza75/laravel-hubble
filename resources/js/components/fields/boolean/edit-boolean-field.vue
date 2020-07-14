<template>
    <div>
        <label class="fake-radio--container" :class="{active: isActive}">
            <input type="hidden" :name="field.name"  :value="0">
            <input type="checkbox" :name="field.name" :value="1" :id="field.name" @input="toggle" :checked="isActive">
            <span class="fake-radio--wrapper">
                <span class="fake-radio"></span>
            </span>
        </label>
    </div>
</template>

<script>
    export default {
        name: "edit-boolean-field",
        props: {
            field: {type: Object, required: true},
            formData: {type: Object, default: () => ({})},
            value: {default: null},
            type: {type: String, default: 'text'}
        },
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
