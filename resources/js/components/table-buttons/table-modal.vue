<template>
    <div class="table--modal">
        <button class="btn btn-radius btn-normal" :class="{[classes]: true}" @click="modalState = true">
            {{name}}
        </button>
        <v-modal :label="title || name" v-if="modalState" @close="modalState = false"
                 card-classes="attach-modal">
            <template v-slot:body>
                <div class="form--group" v-for="field in fields" :key="field.name">
                    <label :for="field.name">{{field.title}}</label>
                    <component :is="field.components[section]" :field="field"
                               :form-data="form" :value="form[field.name]" @input="input(field, $event)"
                               :attributes="field.attributes" v-bind="field.props"></component>
                </div>

            </template>
            <template v-slot:footer>
                <button class="btn btn-normal btn-text" @click="modalState = false">{{cancelText}}
                </button>
                <button class="btn btn-normal btn-primary btn-radius" :disabled="!valid" @click="submit">
                    <span v-show="!submitting">{{confirmText}}</span>
                    <inline-loader v-show="submitting"></inline-loader>
                </button>
            </template>
        </v-modal>

    </div>

</template>

<script>
    import InlineLoader from "../inline-loader";
    import VModal from "../v-modal";
    import {buildFormData} from "../../utils";

    export default {
        name: "table-modal",
        components: {VModal, InlineLoader},
        data: () => ({
            form: {},
            modalState: false,
            submitting: false,
        }),
        props: {
            name: {type: String, required: true},
            classes: {type: String, default: ""},
            title: {type: String, default: null},
            url: {type: String, required: true},
            fields: {type: Array, default: () => ([])},
            section: {type: String, default: "creating"},
            cancelText: {type: String, default: 'Cancel'},
            confirmText: {type: String, default: 'Confirm'}
        },
        computed: {
            valid() {
                return Object.values(this.form).filter(value => Array.isArray(value) ? value.length > 0 : !!value).length > 0
            }
        },
        methods: {
            submit() {
                if (!this.valid) return;
                this.submitting = true;
                this.$axios.post(this.url, buildFormData(this.form), {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    this.modalState = false;
                    this.form = {};
                    this.$emit('refresh');
                }).finally(_ => {
                    this.submitting = false;
                })
            },
            input(field, value) {
                this.$set(this.form, field.name, value)
            }
        }
    }
</script>

<style scoped>

</style>
