<template>
    <div class="checkbox--filter">
        <div v-if="searchable" class="checkbox--filter--search--wrapper">
            <input type="text" class="checkbox--filter--search--input" :placeholder="searchPlaceholder"
                   @input="search">
        </div>
        <div v-show="children.length === 0">
            <div class="checkbox--items">
                <checkbox-filter-item :item="item" :is-active="isActive(item)"
                                      :is-nested="isNested(item)"
                                      @select="select" @input="input" :value-key="valueKey"
                                      :text-key="textKey" v-for="(item, k) in options" :key="k">
                    <template v-slot:display="{item}">
                        <slot name="display" v-bind="{item}">
                            <span>{{item[textKey]}}</span>
                        </slot>
                    </template>
                </checkbox-filter-item>
            </div>
        </div>

        <div v-show="children.length">
            <div class="checkbox--filter--header" v-if="selected">
                <button @click.stop="back" class="black--btn" type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.9999 11H6.41394L11.7069 5.70703L10.2929 4.29303L2.58594 12L10.2929 19.707L11.7069 18.293L6.41394 13H20.9999V11Z"
                            fill="currentColor"/>
                    </svg>
                </button>
                <div class="title">
                    {{selected[textKey]}}
                </div>
            </div>
            <div class="checkbox--items">
                <div class="checkbox--filter--item" @click="input(selected, true)" v-if="selected">
                    <span>Tous</span>
                    <span class="fake-checkbox" :class="{selected: isActive(selected)}"></span>
                </div>
                <checkbox-filter-item :item="item" :is-active="isActive(item)"
                                      :is-nested="isNested(item)"
                                      @select="select" @input="input" :value-key="valueKey"
                                      :text-key="textKey" v-for="(item, k) in children" :key="`child-${k}`">
                    <template v-slot:display="{item}">
                        <slot name="display" v-bind="{item}">
                            <span>{{item[textKey]}}</span>
                        </slot>
                    </template>
                </checkbox-filter-item>
            </div>
        </div>

        <input type="hidden" :value="value ? value[valueKey] : null" :name="name" :id="name" v-if="!multiple">
        <input type="hidden" :value="val[valueKey]" :name="`${name}[]`" :id="name" v-for="(val, k) in (value || [])"
               :key="k" v-else>
    </div>
</template>

<script>
    import CheckboxFilterItem from "./checkbox-filter-item.vue";

    export default {
        name: "dashboard-checkbox-filter",
        data: () => ({
            selectedStack: [],
            searchTimer: null,
        }),
        components: {CheckboxFilterItem},
        props: {
            multiple: {type: Boolean, default: false},
            options: {type: Array, required: true},
            name: {type: String, required: true},
            valueKey: {type: String, required: true},
            textKey: {type: String, required: true},
            searchable: {type: Boolean, default: false},
            searchPlaceholder: {type: String, default: 'Rechercher ...'},
            childrenKey: {required: false, type: String},
            returnObject: {default: true, type: Boolean},
            inputMoreSpecificValue: {default: false, type: Boolean},
            value: {default: undefined},
        },
        computed: {
            selected() {
                if (!this.selectedStack.length) return null;
                return this.selectedStack[this.selectedStack.length - 1]
            },
            children() {
                if (!this.selected) return [];
                return this.selected[this.childrenKey] || [];
            }
        },
        methods: {
            back() {
                this.selectedStack.pop();
            },
            select(item) {
                let index = this.selectedStack.findIndex(el => el[this.valueKey] === item[this.valueKey])
                if (index === -1) {
                    this.selectedStack.push(item)
                } else {
                    this.selectedStack.splice(index, 1)
                }
            },
            input(item, reset = false) {
                let value = item;
                if (this.multiple) {
                    if (reset) value = [item];
                    else {
                        let items = Array.isArray(this.value) ? Object.assign([], this.value) : [];
                        let index = items.findIndex(it => it[this.valueKey] === item[this.valueKey])
                        if (index === -1) {
                            items.push(item)
                        } else {
                            items.splice(index, 1)
                        }

                        value = items;

                        if (this.inputMoreSpecificValue) {
                            let idOfItemsToRemoved = this.selectedStack.map(it => it[this.valueKey])
                            value = value.filter(val => !idOfItemsToRemoved.includes(val[this.valueKey]))
                        }
                    }
                }

                this.$emit('input', value)
            },
            isActive(item) {
                if (!this.value) return;
                let values;
                if (!this.multiple) values = [this.value]
                else values = this.value

                return values.findIndex(val => val[this.valueKey] === item[this.valueKey]) !== -1
            },
            isNested(item) {
                if (!this.childrenKey) return false;
                return item[this.childrenKey] && item[this.childrenKey].length > 0
            },
            search(event) {
                clearTimeout(this.searchTimer)
                this.searchTimer = setTimeout(() => {
                    let value = event.target.value;
                    this.$emit('search', value)
                }, 300)
            }
        },
    }
</script>

<style scoped>

</style>
