<template>
    <div :class="{[`show--file--wrapper`]: true}">
        <div v-if="!value || value.length === 0">N/A</div>
        <div v-else-if="value.length === 1">
            <a :href="value[0].url" target="_blank" class="default--color">{{limit(value[0].name, 10)}}</a>
        </div>
        <div v-else>{{value.length}} Fichiers</div>
    </div>
</template>

<script>

    export default {
        name: "index-file-field",
        props: {
            field: {type: Object, required: true},
            value: {default: null},
        },
        methods: {
            limit(filename, length = 50) {
                let parts = filename.split('.');
                let extension = parts.pop();
                let basename = parts.join('.');

                if (basename.length > length) basename = basename.substr(0, length) + '...';
                console.log(basename + '.' + extension)
                return basename + '.' + extension;
            }
        }
    }
</script>

<style scoped>

</style>
