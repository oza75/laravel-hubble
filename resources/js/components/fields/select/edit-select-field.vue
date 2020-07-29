<template>
    <div class="custom--select--container">
        <template v-if="!multiple">
            <input type="text" @click.stop @keyup="onSearch" :placeholder="placeholder" @keydown="onKeydown"
                   ref="textInput" :class="{error: hasErrors}" :id="field.name" autocomplete="off"
                   @focus="openDropdown">
            <input :name="field.name" :value="inputValue" ref="input" v-show="false">
        </template>
        <template v-if="multiple">
            <div class="tags--wrapper" :class="{error: hasErrors}" @click.stop="openDropdown">
                <div class="tag" v-for="(tag,i) in tags" @click.stop="removeTag(tag)">
                    <span>{{tag[textKey]}}</span>
                    <div class="remove">
                        <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.40994 7L12.7099 2.71C12.8982 2.5217 13.004 2.2663 13.004 2C13.004 1.7337 12.8982 1.47831 12.7099 1.29C12.5216 1.1017 12.2662 0.995911 11.9999 0.995911C11.7336 0.995911 11.4782 1.1017 11.2899 1.29L6.99994 5.59L2.70994 1.29C2.52164 1.1017 2.26624 0.995911 1.99994 0.995911C1.73364 0.995911 1.47824 1.1017 1.28994 1.29C1.10164 1.47831 0.995847 1.7337 0.995847 2C0.995847 2.2663 1.10164 2.5217 1.28994 2.71L5.58994 7L1.28994 11.29C1.19621 11.383 1.12182 11.4936 1.07105 11.6154C1.02028 11.7373 0.994141 11.868 0.994141 12C0.994141 12.132 1.02028 12.2627 1.07105 12.3846C1.12182 12.5064 1.19621 12.617 1.28994 12.71C1.3829 12.8037 1.4935 12.8781 1.61536 12.9289C1.73722 12.9797 1.86793 13.0058 1.99994 13.0058C2.13195 13.0058 2.26266 12.9797 2.38452 12.9289C2.50638 12.8781 2.61698 12.8037 2.70994 12.71L6.99994 8.41L11.2899 12.71C11.3829 12.8037 11.4935 12.8781 11.6154 12.9289C11.7372 12.9797 11.8679 13.0058 11.9999 13.0058C12.132 13.0058 12.2627 12.9797 12.3845 12.9289C12.5064 12.8781 12.617 12.8037 12.7099 12.71C12.8037 12.617 12.8781 12.5064 12.9288 12.3846C12.9796 12.2627 13.0057 12.132 13.0057 12C13.0057 11.868 12.9796 11.7373 12.9288 11.6154C12.8781 11.4936 12.8037 11.383 12.7099 11.29L8.40994 7Z"/>
                        </svg>
                    </div>
                </div>
                <input type="text"  :id="field.name" :placeholder="placeholder" @click.stop @keyup="onSearch"
                       @keydown="onKeydown"
                       @focus="openDropdown">
            </div>
            <input :name="`${field.name}[]`" :value="val[valueKey]" :key="k" ref="input"
                   v-for="(val, k) in tags" v-show="false">
        </template>
        <input-errors :errors="errors"/>
        <ul class="custom--select--content" :class="{open: dropdownOpened}" ref="optionsContent">
            <li @click="empty">{{emptyOptionName}}</li>
            <li v-for="(option, k) in realOptions" :id="'custom--select--option-'+k"
                :class="{hover: currentIndex === k}" @click="select(option)"
                :key="'custom--option-'+option[valueKey]">
                {{option[textKey]}}
            </li>
        </ul>
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
            tags: []
        }),
        props: {
            options: {required: true, type: [Array, String]},
            valueKey: {required: true, type: String},
            textKey: {required: true, type: String},
            multiple: {type: Boolean, default: false},
            placeholder: {type: String, default: null},
            emptyOptionName: {type: String, default: null}
        },
        mixins: [EditMixin],
        computed: {
            wrapper() {
                return this.$refs['optionsContent'];
            }
        },
        methods: {
            openDropdown() {
                if (this.dropdownOpened) return;
                this.dropdownOpened = true;

                this.$nextTick(() => {
                    new ClickOutside(this.$refs['optionsContent'], () => {
                        this.close();
                    })
                })
            },
            fetchOptions(clear = false) {
                let url = `${this.options}?page=${this.page}`;
                if (this.searchValue) {
                    url += '&search=' + this.searchValue;
                }
                this.$axios.get(url).then(res => {
                    if (this.page !== 1) {
                        this.realOptions = this.realOptions.concat(res.data.data);
                    } else {
                        this.realOptions = res.data.data
                    }
                })
            },
            onKeydown(keyboardEvent) {
                if (keyboardEvent.keyCode === 13) {
                    keyboardEvent.preventDefault();
                    if (this.currentIndex <= -1) return;
                    let option = this.realOptions[this.currentIndex];
                    this.lockSearch = true;
                    this.select(option);
                    return;
                }

                if (keyboardEvent.keyCode === 40) {
                    if (this.realOptions.length > this.currentIndex + 1) {
                        this.currentIndex += 1;
                        this.scrollToOption(this.currentIndex)
                    }
                    return;
                }
                if (keyboardEvent.keyCode === 38) {
                    if (this.currentIndex - 1 > -1) {
                        this.currentIndex -= 1;
                        this.scrollToOption(this.currentIndex, 'prev');
                    }
                    return;
                }
                if (keyboardEvent.keyCode === 9) {
                    this.close()
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
            },
            onSearch(event) {
                let query = event.target.value;
                let values = [];

                if (this.multiple) {
                    values = this.tags.map(tag => tag[this.textKey])
                } else {
                    let item = this.realOptions.find(opt => opt[this.valueKey] === this.inputValue)
                    if (item) values = [item[this.textKey]]
                }

                clearTimeout(this.searchTimer)

                if ((query === this.searchValue) || (values.includes(query) && this.currentIndex !== -1)) {
                    return;
                }

                this.searchTimer = setTimeout(() => {
                    this.search(query)
                }, Array.isArray(this.options) ? 0 : 500)
            },
            search(query) {
                query = String(query).toLowerCase()
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
                    let values = this.tags
                    let index = values.findIndex(value => value[this.valueKey] === option[this.valueKey])
                    if (index === -1) values.push(option)
                    else values.splice(index, 1)

                    this.tags = values;
                    this.input(this.tags)
                    return;
                }

                this.inputValue = option[this.valueKey];
                this.input(option)
                this.dropdownOpened = false;
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
                let index = this.tags.findIndex(t => t[this.valueKey] === tag[this.valueKey])
                if (index === -1) return;
                this.tags.splice(index, 1)
            }
        },
        watch: {
            page() {
                this.fetchOptions()
            },
            inputValue(value) {
                if (!value) this.$refs['textInput'].removeAttribute('value')
                let item = this.realOptions.find(option => option[this.valueKey] === value)
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
                this.fetchOptions()
            }

            if (this.multiple) this.tags = this.value;
            else this.inputValue = this.value;

        },
        mounted() {
            this.$nextTick(() => {
                new InfiniteScroll(() => {
                    this.page = this.page + 1
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
