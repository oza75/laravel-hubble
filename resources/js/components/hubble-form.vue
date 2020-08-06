<template>
    <ol class="table--list">
        <li class="table--list--row" v-for="(field, k) in fields" :key="'field-'+k"
            :class="{['field-'+field.name+'-row']: true}">
            <label class="table--list--cell label--cell" :for="field.name">{{field.title}}</label>
            <div class="table--list--cell input--cell">
                <component :is="field.components[type]" v-bind="field.props" :attributes="field.attributes" :item="item"
                           :form-data="formData" :field="field" @input="$emit('input', field.name, $event)"
                           :value="getValue(field)"></component>
            </div>
        </li>
    </ol>
</template>

<script>
    export default {
        name: "hubble-form",
        props: {
            resource: {type: Object, required: true},
            type: {type: String, default: 'editing'},
            formData: {type: Object, default: () => ({})},
            item: {type: Object, default: () => ({})}
        },
        computed: {
            fields() {
                return Object.values(this.resource.fields)
            }
        },
        methods: {
            getValue(field) {
                let value = this.formData[field.name];
                if (value === null || value === undefined) {
                    return field.attributes.defaultValue;
                }
                return value;
            },
        }
    }
</script>
