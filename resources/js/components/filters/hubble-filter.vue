<template>
    <filter-wrapper>
        <template v-slot:label>{{filter.title}}</template>
        <template v-slot:content>
            <component :is="filter.component" :value="value" @input="$emit('input', $event)" v-bind="filter.attributes"
                       :options="filterOptions" @search="search"
                       :multiple="filter.multiple" :name="filter.name"/>
        </template>
    </filter-wrapper>
</template>

<script>
    import FilterWrapper from "./filter-wrapper";

    export default {
        name: "hubble-filter",
        data: () => ({
            filterOptions: []
        }),
        components: {FilterWrapper},
        props: {
            filter: {type: Object, required: true},
            value: {default: undefined}
        },
        methods: {
            fetchData() {
                if (Array.isArray(this.filter.options)) {
                    this.filterOptions = this.filter.options;
                    return;
                }

                this.$axios.get(this.filter.options).then(res => {
                    this.filterOptions = res.data.data
                })
            },
            getCustomFilterText(filter) {
                if (!this.value || filter.multiple)
                    return filter.title;

                return this.value[filter.textKey] || filter.title
            },
            search(query) {
                if (!query) {
                    this.filterOptions = this.filter.options;
                    return;
                }

                this.filterOptions = this.filter.options.filter(it => {
                    return String(it[this.filter.attributes.textKey]).toLowerCase().includes(String(query).toLowerCase())
                });
            },
        }
        ,
        created() {
            this.fetchData()
        }
    }
</script>

<style scoped>

</style>
