<template>
    <filter-wrapper>
        <template v-slot:label>{{ filter.title }}</template>
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
        originalsOptions: [],
        filterOptions: [],
        page: 1,
    }),
    components: {FilterWrapper},
    props: {
        filter: {type: Object, required: true},
        value: {default: undefined}
    },
    methods: {
        fetchData(search = '', page = 1) {
            this.$axios.get(this.filter.options, {params: {search, page}}).then(res => {
                const items = res.data.data || res.data;
                if (page <= 1) {
                    this.filterOptions = items
                } else {
                    this.filterOptions = this.filterOptions.concat(items);
                }
                this.originalsOptions = this.filterOptions;
            })
        },
        getCustomFilterText(filter) {
            if (!this.value || filter.multiple)
                return filter.title;

            return this.value[filter.textKey] || filter.title
        },
        search(query) {
            if (!query) {
                this.filterOptions = this.originalsOptions;
                return;
            }

            if (Array.isArray(this.filter.options)) {
                this.filterOptions = this.originalsOptions.filter(it => {
                    return String(it[this.filter.attributes.textKey]).toLowerCase().includes(String(query).toLowerCase())
                });
            } else {
                this.page = 1;
                this.fetchData(query, this.page);
            }
        },
    }
    ,
    created() {
        if (Array.isArray(this.filter.options)) {
            this.originalsOptions = this.filter.options;
            this.filterOptions = this.filter.options;
        } else {
            this.fetchData()
        }
    }
}
</script>

<style scoped>

</style>
