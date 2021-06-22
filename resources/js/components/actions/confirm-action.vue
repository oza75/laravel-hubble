<template>
    <v-modal :label="$t('dashboard.confirmation')" @close="close">
        <template v-slot:body>
            <p v-html="confirmMessage"></p>
        </template>
        <template v-slot:footer>
            <button class="btn btn-text btn-normal" @click="close">
                {{ $t('dashboard.cancel') }}
            </button>
            <button class="btn btn-normal btn-primary" @click="run();">{{ $t('dashboard.confirm') }}</button>
        </template>
    </v-modal>
</template>

<script>
import {ActionMixin} from "./ActionMixin";

export default {
    name: "confirm-action",
    props: {
        confirmMessage: {type: String, required: true}
    },
    mixins: [ActionMixin],

    methods: {
        ran() {
            this.$emit('ran');
            this.close();
        }
    }
}
</script>

<style scoped>

</style>
