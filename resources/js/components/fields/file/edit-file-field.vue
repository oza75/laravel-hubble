<template>
    <div class="edit-file-field">
        <ul class="current-files">
            <li v-for="file in files" :key="file.name" class="file">
                <a :href="file.url" target="_blank">{{file.name}}</a>
                <svg @click="remove(file)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </li>
        </ul>
        <input type="file" :id="field.name" :accept="field.attributes.accept || '*'" :class="{error: hasErrors}" :name="multiple ? field.name+ '[]' : field.name"
               :multiple="multiple" v-if="canAdd"  :maxlength="!max ? Infinity : max - files.length"
               v-bind="{...$attrs, ...rulesAttrs}" @input="input($event.target.value)">
        <input type="hidden" :name="`${field.name}__removed__[]`" :value="file.name" v-for="file in removed"
               :key="'remove-'+file.name">
        <input type="hidden" :name="`${field.name}__current__[]`" :value="file.name" v-for="file in oldFiles"
               :key="'current-'+file.name">
        <input-errors :errors="errors"/>
    </div>
</template>

<script>
    import {EditMixin} from "../mixins";

    export default {
        name: "edit-file-field",
        data: () => ({
            removed: [],
            oldFiles: []
        }),
        mixins: [EditMixin],
        props: {
            multiple: {type: Boolean, default: false},
            max: {type: Number, default: null},
        },
        computed: {
            files() {
                return this.formData[this.field.name + '_files'] || [];
            },
            canAdd() {
                if (!this.multiple) return this.files.length < 1;
                if (!this.max) return true;
                return this.files.length < this.max;
            }
        },
        methods: {
            remove(file) {
                let files = Object.assign([], this.files)
                let index = files.findIndex(it => it.name === file.name);
                if (index === -1) return;
                files.splice(index, 1);
                this.removed.push(file);

                this.$set(this.formData, this.field.name + '_files', files);
            }
        },
        created() {
            this.oldFiles = Object.assign([], this.files)
        }
    }
</script>

<style scoped>

</style>
