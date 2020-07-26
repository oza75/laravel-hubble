<template>
    <div :class="{[`show--image--wrapper`]: true}" class="index--image--component">
        <div v-if="!value || value.length === 0">N/A</div>
        <div v-else-if="value.length === 1">
            <img :src="value[0].url" :alt="value[0].name">
        </div>
        <div v-else>{{value.length}} Images</div>
    </div>
</template>

<script>

    export default {
        name: "index-image-field",
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
