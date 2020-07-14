<template>
    <div :class="{[`show--${type}--wrapper`]: true}">
        <pre v-html="value" v-if="!limit"></pre>
        <div v-else>
            <div v-html="text" v-if="!showMore"></div>
            <pre v-html="value" v-else></pre>

            <button class="btn btn-normal btn-text text-primary" @click="showMore =!showMore"
                    style="padding-left: 0 !important; padding-right: 0 !important;font-weight: bold; cursor: pointer;">
                <span v-if="showMore">Afficher moins</span>
                <span v-else>Afficher plus</span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "show-text-field",
        data: () => ({
            showMore: false,
        }),
        props: {
            field: {type: Object, required: true},
            value: {default: null},
            type: {default: 'text', type: String},
            limit: {default: null}
        },
        computed: {
            text() {
                if (!this.limit) return this.value;

                return String(this.value).substr(0, this.limit)
            }
        }
    }
</script>

<style scoped>

</style>
