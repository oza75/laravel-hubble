<template>
    <div class="custom--select--container" :class="{[classes]: true}">
        <template v-if="!multiple">
            <input type="text" @click.stop @keyup="onSearch" :placeholder="inputAttrs.placeholder" @keydown="onKeydown"
                   ref="textInput" v-bind="inputAttrs" :class="{error: hasErrors}" :id="field.name + '__'"
                   autocomplete="off"
                   @focus="openDropdown">
            <input :name="field.name" :value="inputValue" ref="input" v-show="false">
        </template>
        <template v-if="multiple">
            <div class="tags--wrapper" :class="{error: hasErrors}">
                <div class="tags--fake--input" @click.stop="openDropdown" :class="{focused: dropdownOpened}">
                    <div class="tags--container">
                        <span class="placeholder"
                              v-if="!tags || (tags && tags.length === 0)">{{ inputAttrs.placeholder }}</span>
                        <div class="tag" v-for="(tag, k) in (tags || []).slice(0, tagsToDisplay)" :key="'tag-'+k">
                            <span class="tag--content" :title="tag[textKey]">{{ tag[textKey] }}</span>
                            <svg fill="none" @click="removeTag(tag)" stroke-linecap="round" stroke-linejoin="round"
                                 stroke-width="2"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </div>
                        <div v-if="tags.length > tagsToDisplay">...</div>
                    </div>
                    <div class="tags--fake--input--btns">
                        <button class="btn count">{{ tags.length }}</button>
                        <svg @click="removeAllTags" v-show="tags.length > 0" fill="none" stroke-linecap="round"
                             stroke-linejoin="round"
                             stroke-width="2"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                             viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <input :name="`${field.name}[]`" v-bind="inputAttrs" :value="val[valueKey]" :key="k" ref="input"
                   v-for="(val, k) in tags" v-show="false">
        </template>
        <input-errors :errors="errors"/>
        <div class="custom--select--wrapper" :class="{open: dropdownOpened}">
            <div class="tags--wrapper--search--input--wrapper">
                <input type="text" ref="tagSearchInput" @click.stop class="search--input" @keyup="onSearch"
                       @keydown="onKeydown" :placeholder="$t('dashboard.search') || 'Search ...'">
                <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <ul class="all-tags--wrapper custom--scrollbar" v-show="dropdownTags.length > 0">
                <li v-for="(option, k) in dropdownTags" :id="'all-tag--option-'+k"
                    class="fake-checkbox--container" @click.stop="select(option)"
                    :key="'all-tags-'+option[valueKey]">
                    <div class="fake-checkbox" :class="{selected: isSelected(option)}"></div>
                    <div>{{ option[textKey] }}</div>
                </li>
            </ul>
            <ul class="custom--select--content custom--scrollbar" ref="optionsContent">
                <!--                <li @click="empty">{{emptyOptionName}}</li>-->
                <li v-for="(option, k) in listOptions" :id="'custom--select--option-'+k"
                    :class="{hover: currentIndex === k}" class="fake-checkbox--container" @click.stop="select(option)"
                    :key="'custom--option-'+option[valueKey]">
                    <div class="fake-checkbox" :class="{selected: isSelected(option)}"></div>
                    <div>{{ option[textKey] }}</div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
import InfiniteScroll from "../../../classes/InfiniteScroll";
import ClickOutside from "../../../classes/ClickOutside"
import {EditMixin} from "../mixins";

export default {
    name: "edit-select-field",
    data: () => ({
        realOptions: [],
        page: 1,
        dropdownOpened: false,
        searchTimer: null,
        searchValue: null,
        inputValue: null,
        currentIndex: -1,
        lockSearch: false,
        tags: [],
        dropdownTags: []
    }),
    props: {
        options: {required: true, type: [Array, String]},
        valueKey: {required: true, type: String},
        textKey: {required: true, type: String},
        multiple: {type: Boolean, default: false},
        placeholder: {type: String, default: null},
        emptyOptionName: {type: String, default: null},
        returnObject: {type: Boolean, default: true},
        tagsToDisplay: {type: Number, default: 2}
    },
    mixins: [EditMixin],
    computed: {
        wrapper() {
            return this.$refs['optionsContent'];
        },
        listOptions() {
            if (this.multiple) {
                let dts = this.dropdownTags.map(t => t[this.valueKey])
                return this.realOptions.filter(option => !dts.includes(option[this.valueKey]))
            }

            return this.realOptions
        }
    },
    methods: {
        openDropdown() {
            if (this.dropdownOpened) return;
            this.dropdownOpened = true;
            this.dropdownTags = Object.assign([], this.tags);
            this.currentIndex = -1;
            this.scrollToOption(0, 'prev')

            this.$nextTick(() => {
                new ClickOutside(this.$refs['optionsContent'], () => {
                    this.close();
                });
                if (this.$refs['tagSearchInput']) {
                    this.$refs['tagSearchInput'].focus();
                }
            });

            this.$emit('dropdown-open');
        },
        fetchOptions(clear = false) {
            return this.$axios.get(this.options, {params: {page: this.page, search: this.searchValue}}).then(res => {
                const values = this.realOptions.map(o => o[this.valueKey]);
                const items = res.data.data.filter(o => !values.includes(o[this.valueKey]))
                if (this.page !== 1) {
                    this.realOptions = this.realOptions.concat(items);
                } else {
                    this.realOptions = items
                }
            })
        },
        fetchOptionItem(value) {
            return this.$axios.get(this.options, {params: {[this.valueKey]: value}}).then(res => {
                this.realOptions.push(res.data.data);
                this.inputValue = value;
            });
        },
        onKeydown(keyboardEvent) {
            if (keyboardEvent.keyCode === 13) {
                keyboardEvent.preventDefault();
                if (this.currentIndex <= -1) return;
                let option = this.listOptions[this.currentIndex];
                this.lockSearch = true;
                this.select(option);
                return;
            }

            if (keyboardEvent.keyCode === 40) {
                if (this.realOptions.length > this.currentIndex + 1) {
                    this.currentIndex += 1;
                    this.$emit('next');
                    this.scrollToOption(this.currentIndex);
                }
                return;
            }
            if (keyboardEvent.keyCode === 38) {
                if (this.currentIndex - 1 > -1) {
                    this.currentIndex -= 1;
                    this.scrollToOption(this.currentIndex, 'prev');
                    this.$emit('prev');
                }
                return;
            }
            if (keyboardEvent.keyCode === 9) {
                this.close();
                return;
            }

            if (keyboardEvent.keyCode === 27) {
                this.close();
                return;
            }

            // if (!this.searchable) keyboardEvent.preventDefault();

        },
        scrollToOption(index, direction = 'next') {
            let li = this.wrapper.querySelector(`#custom--select--option-${index}`)
            if (!li) return;
            let rect = li.getBoundingClientRect();
            let wrapperHeight = this.wrapper.getBoundingClientRect().height;

            if (direction === 'next') {
                if (li.offsetTop + rect.height > wrapperHeight + this.wrapper.scrollTop) {
                    this.wrapper.scrollTo({
                        left: 0,
                        top: li.offsetTop + rect.height - wrapperHeight,
                        behavior: "smooth"
                    })
                }
            } else {
                if (li.offsetTop < this.wrapper.scrollTop) {
                    this.wrapper.scrollTo({
                        left: 0,
                        top: li.offsetTop,
                        behavior: "smooth"
                    })
                }
            }
        },
        close() {
            this.dropdownOpened = false;
            this.$emit('close');
        },
        onSearch(event) {
            let query = event.target.value;
            let values = [];

            if (this.multiple) {
                values = this.tags.map(tag => tag[this.textKey])
            } else {
                let item = this.realOptions.find(opt => opt[this.valueKey] == this.inputValue)
                if (item) values = [item[this.textKey]]
            }

            clearTimeout(this.searchTimer)

            if ((query === this.searchValue) || (values.includes(query) && this.currentIndex !== -1)) {
                return;
            }

            this.searchTimer = setTimeout(() => {
                this.search(query);
            }, Array.isArray(this.options) ? 0 : 500)
        },
        search(query) {
            query = String(query).toLowerCase()
            this.$emit('search', query);
            this.searchValue = query;
            if (Array.isArray(this.options)) {
                if (!query) this.realOptions = this.options;
                this.realOptions = this.options.filter(item => {
                    return String(item[this.textKey]).toLowerCase().includes(query)
                })
            } else {
                if (this.page === 1) {
                    this.fetchOptions()
                }
                this.page = 1
                this.$refs['optionsContent'].removeAttribute('data-infinite-height')
            }
        },
        select(option) {
            if (this.multiple) {
                let values = this.tags || []
                let index = values.findIndex(value => value[this.valueKey] == option[this.valueKey])
                if (index === -1) values.push(option)
                else values.splice(index, 1)

                this.tags = values;

                return;
            }

            this.inputValue = option[this.valueKey];
            this.input(this.returnObject ? option : option[this.valueKey])
            this.dropdownOpened = false;
        },
        isSelected(option) {
            if (!this.multiple) {
                if (!this.value) return false;
                return option[this.valueKey] == (this.returnObject ? this.value[this.valueKey] : this.value);
            }

            return (this.tags || []).findIndex(tag => tag[this.valueKey] == option[this.valueKey]) !== -1
        },
        empty() {
            if (this.multiple) {
                this.tags = [];
                this.dropdownOpened = false;
                this.input([])
                return;
            }

            this.inputValue = null;
            this.input(null)
            this.dropdownOpened = false;
        },
        removeTag(tag) {
            let index = this.tags.findIndex(t => t[this.valueKey] == tag[this.valueKey])
            if (index === -1) return;
            this.$emit('unselect', this.tags[index], index);
            this.tags.splice(index, 1);
        },
        removeAllTags() {
            this.tags = [];
            this.$emit('clearAll');
        }
    },
    watch: {
        tags(values) {
            this.input(this.returnObject ? values : values.map(value => value[this.valueKey]))
        },
        page() {
            this.$emit('paginate', this.page);
            this.fetchOptions();
        },
        inputValue(value) {
            if (!value) this.$refs['textInput'].removeAttribute('value')
            let item = this.realOptions.find(option => option[this.valueKey] == value)
            if (!item) {
                this.$refs['textInput'].value = null;
                return;
            }

            this.$refs['textInput'].value = item[this.textKey]
        }
    },
    created() {
        if (Array.isArray(this.options)) {
            this.realOptions = this.options;
        } else {
            this.fetchOptions().then(_ => {
                const option = this.realOptions.find(o => o[this.valueKey] == this.value);
                if (!option) this.fetchOptionItem(this.value);
            })
        }

        if (this.multiple) this.tags = this.value || [];
        else this.inputValue = this.value;

    },
    mounted() {
        this.$nextTick(() => {
            new InfiniteScroll(() => {
                this.page = this.page + 1
                this.$emit('paginate', this.page);
            }, {
                element: this.$refs['optionsContent'],
                threshold: 30
            })
        })
    }
}
</script>

<style scoped>

</style>
