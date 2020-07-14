<template>
    <div>
        <select :value="value" :id="field.name" :name="field.name" v-bind="$attrs"
                @input="$emit('input', $event.target.value)">
            <option :value="null" selected>Choisir une option</option>
            <option :value="option[valueKey]" v-for="(option,k) in options" :key="k">{{option[textKey]}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "edit-select-field",
        props: {
            field: {type: Object, required: true},
            formData: {type: Object, default: () => ({})},
            value: {default: null},
            options: {required: true, type: Array},
            valueKey: {required: true, type: String},
            textKey: {required: true, type: String}
        }
    }
</script>

<style scoped>

</style>
