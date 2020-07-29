<template>
    <div class="inline-block file-input--container">
        <div @click="onFocus">
            <slot name="activator">
                <label for="file-input">{{label.toUpperCase()}}</label>
                <input type="text" id="file-input" v-model="filename" :disabled="disabled" ref="fileTextField"
                       @click.self="onFocus" :required="required">
            </slot>
        </div>
        <input type="file" :name="name" :accept="accept" :multiple="multiple" :disabled="disabled"
               ref="fileInput" @change="onFileChange">
    </div>
</template>

<script>
    export default {
        name: "file-input",
        data: () => ({
            filename: '',
            formData: []
        }),
        props: {
            value: {
                type: [Array, String]
            },
            accept: {
                type: String,
                default: '*'
            },
            name: {required: true, type: String},
            label: {
                type: String,
                default: 'choose_file'
            },
            required: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            type: {type: String, default: ''},
            max: {
                type: Number,
                default: null
            }
        },
        methods: {
            onFocus() {
                this.$emit('focus');
                // @ts-ignore
                this.$refs.fileInput.value = '';
                if (!this.disabled) {
                    // @ts-ignore
                    this.$refs.fileInput.click();
                }
            },

            onFileChange($event) {
                const files = $event.target.files || $event.dataTransfer.files;

                this.$emit('upload', files, this.type);
            }
        },
        mounted() {
            this.filename = this.value;
        }
    }
</script>

<style scoped>
    input[type=file] {
        position: absolute;
        left: -99999px;
    }
</style>
