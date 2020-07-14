<template>
    <div>
        <input :type="type" :value="value" :id="field.name" :name="field.name" v-bind="$attrs" @input="$emit('input', $event.target.value)">
    </div>
</template>

<script>
    export default {
        name: "edit-text-field",
        props: {
            field: {type: Object, required: true},
            formData: {type: Object, default: () => ({})},
            value: {default: null},
            type: {type: String, default: 'text'}
        }
    }
</script>

<style scoped>

</style>
