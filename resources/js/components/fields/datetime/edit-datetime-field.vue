<template>
    <div>
        <input type="datetime-local" :value="value" :class="{error: hasErrors}" :id="field.name"
               :name="field.name" v-bind="{...$attrs, ...rulesAttrs}" ref="input"
               @input="input($event.target.value)">
        <input-errors :errors="errors"/>
    </div>
</template>

<script>

    import {EditMixin} from "../mixins";
    const flatpickr = require('flatpickr');
    require('flatpickr/dist/flatpickr.min.css')

    export default {
        name: "edit-datetime-field",
        props: {
            format: {default: 'Y-m-d H:i'},
            locale: {type: String, default: 'en'}
        },
        mixins: [EditMixin],
        mounted() {
            this.$nextTick(() => {
                flatpickr(this.$refs['input'], {
                    dateFormat: this.format,
                    enableTime: true,
                    locale: this.locale
                    // locale: require(`flatpickr/dist/l10n/${this.locale}.components`).default[this.locale]
                })
            })
        }
    }
</script>

