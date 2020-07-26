<template>
    <div class="edit-image-field">
        <ul class="current-files">
            <li v-for="file in previews" :key="file.name" class="file">
                <div class="add-card" :style="`background-image: url(${file.url})`">
                    <div @click="remove(file)" class="remove-btn">
                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round"
                             stroke-width="2"
                             viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </div>
                </div>
            </li>
        </ul>
        <file-input :id="field.name" :name="'__fake__' + field.name"
                    :multiple="multiple" @upload="upload" v-if="canAdd">
            <template v-slot:activator>
                <div class="add-card">
                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path d="M12 4v16m8-8H4"></path>
                    </svg>
                </div>
            </template>
        </file-input>
        <input type="file" :id="field.name" :name="multiple ? field.name+ '[]' : field.name" style="display: none"
               :multiple="multiple" ref="fileInput"
               v-bind="$attrs">
        <input type="hidden" :name="`${field.name}__removed__[]`" :value="file.name" v-for="file in removed"
               :key="'remove-'+file.name">
        <input type="hidden" :name="`${field.name}__current__[]`" :value="file.name" v-for="file in oldFiles"
               :key="'current-'+file.name">
    </div>
</template>

<script>
    import FileInput from "./FileInput";
    import {arrayToFileList, mergeFiles} from "../../../utils";

    export default {
        name: "edit-image-field",
        data: () => ({
            previews: [],
            images: [],
            removed: [],
            oldFiles: []
        }),
        props: {
            field: {type: Object, required: true},
            formData: {type: Object, default: () => ({})},
            value: {default: null},
            multiple: {type: Boolean, default: false},
            max: {type: Number, default: null}
        },
        components: {FileInput},
        computed: {
            files() {
                return this.formData[this.field.name + '_files'] || [];
            },
            canAdd() {
                if (!this.multiple) return this.previews.length < 1;
                if (!this.max) return true;
                return this.previews.length < this.max;
            }
        },
        methods: {
            remove(file) {
                let files = Object.assign([], this.files)
                let index = files.findIndex(it => it.name === file.name);
                if (index !== -1) {
                    this.removed.push(file);
                }

                let pIndex = this.previews.findIndex(it => it.name === file.name);
                if (pIndex !== -1) this.previews.splice(pIndex, 1);

                let iIndex = this.images.findIndex(it => it.name === file.name)
                if (iIndex !== -1) this.images.splice(iIndex, 1)
            },
            /**
             * @param {FileList} files
             */
            upload(files) {
                for (const file of files) {
                    let index = this.previews.findIndex(it => it.name === file.name);
                    if (index !== -1 || !this.canAdd) continue;
                    let reader = new FileReader();
                    reader.addEventListener('load', () => {
                        this.previews.push({
                            url: reader.result,
                            name: file.name
                        })
                    })
                    reader.readAsDataURL(file);
                }

                let aFiles = Array.from(files);
                let toAdd = aFiles;
                if (!this.canAdd) toAdd = [];
                else if (!this.max) toAdd = aFiles;
                else {
                    toAdd = aFiles.slice(0, this.max - this.images.length)
                }
                this.images = mergeFiles(this.images, toAdd)
            }
        },
        watch: {
            images(images) {
                this.$refs['fileInput'].files = arrayToFileList(images)
                this.$emit('input', images)
            },
            previews(previews) {
                this.$set(this.formData, this.field.name + '_files', previews)
            }
        },
        created() {
            this.previews = Object.assign([], this.files)
            this.oldFiles = Object.assign([], this.files)
        }
    }
</script>

<style scoped>

</style>
