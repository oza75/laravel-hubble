<template>
    <ul :class="{[`show--image--wrapper`]: true, [classes]: true}" class="show--image--component">
        <li v-for="file in value" :key="file.name">
            <a :href="file.url" target="_blank" class="image-card" :style="`background-image: url(${file.url})`">
                <button :href="file.url"  class="btn download" @click.stop.prevent="downloadImage(file)">
                    <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                </button>
            </a>
        </li>
    </ul>
</template>

<script>
    import {DetailsMixins} from "../mixins";

    const download = require('downloadjs')
    export default {
        name: "show-image-field",
        data: () => ({}),
        props: {
            field: {type: Object, required: true},
            value: {default: null},
        },
        mixins: [DetailsMixins],
        computed: {},
        methods: {
            downloadImage(file) {
                download(file.url)
            }
        }
    }
</script>

<style scoped>

</style>
