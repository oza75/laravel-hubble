<template>
    <button @click="run" :target="target" class="btn btn-radius btn-normal" :class="{[classes]: true}">
        <span v-if="!running">{{ name }}</span>
        <inline-loader v-else/>
    </button>
</template>

<script>
import Donwload from 'downloadjs';
import InlineLoader from "../inline-loader";
export default {
    name: "export-button",
    components: {InlineLoader},
    data: () => ({running: false}),
    props: {
        name: {type: String, required: true},
        url: {type: String, required: true},
        target: {type: String, default: null},
        classes: {type: String, default: ""}
    },
    methods: {
        run() {
            if (this.running) return false;
            this.running = true;
            this.$axios.get(this.url).then(res => {
                Donwload(res.data.file)
            }).finally(_ => {
                this.running = false;
            });
        }
    }
}
</script>
