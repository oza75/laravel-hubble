<template>
    <div>
        <input type="datetime-local" :value="value" :id="field.name"
               :name="field.name" v-bind="$attrs" ref="input"
               @input="$emit('input', $event.target.value)">

    </div>
</template>

<script>

    const flatpickr = require('flatpickr');
    require('flatpickr/dist/flatpickr.min.css')

    export default {
        name: "edit-datetime-field",
        props: {
            field: {type: Object, required: true},
            formData: {type: Object, default: () => ({})},
            value: {default: null},
            format: {default: 'Y-m-d H:i'},
            locale: {type: String, default: 'en'}
        },
        mounted() {
            this.$nextTick(() => {
                flatpickr(this.$refs['input'], {
                    dateFormat: this.format,
                    enableTime: true,
                    locale: this.locale
                    // locale: require(`flatpickr/dist/l10n/${this.locale}.js`).default[this.locale]
                })
            })
        }
    }
</script>

