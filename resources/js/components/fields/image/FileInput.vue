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

<script lang="js">
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

    .input-main-card {
        background-color: #34495e;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .input-main-card:hover {
        background-color: #1abc9c;
    }

    .remove-btn {
        position: absolute;
        left: -40px;
        top: -40px;
        color: white;
        transform: translateX(20px) translateY(20px);
        transition: all 0.3s;
    }

    .remove-btn:hover {
        width: 112px !important;
        height: 112px !important;
        left: -80px;
        top: -80px;
        transform: translateX(40px) translateY(40px);
    }

    .round {
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }
</style>
