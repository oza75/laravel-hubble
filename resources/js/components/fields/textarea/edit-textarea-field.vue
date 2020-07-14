<template>
    <div>
        <textarea :value="value" :id="field.name" rows="5" :name="field.name" v-bind="$attrs"
                  @input="$emit('input', $event.target.value)">
        </textarea>
    </div>
</template>

<script>
    export default {
        name: "edit-textarea-field",
        props: {
            field: {type: Object, required: true},
            formData: {type: Object, default: () => ({})},
            value: {default: null},
        }
    }
</script>

<style scoped>

</style>
