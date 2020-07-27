(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["hubble-index"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VPagination.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/VPagination.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "VPagination",
  props: {
    value: {
      type: Number
    },
    pageCount: {
      type: Number,
      required: true
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      "default": function _default() {}
    },
    pageRange: {
      type: Number,
      "default": 3
    },
    marginPages: {
      type: Number,
      "default": 1
    },
    prevText: {
      type: String,
      "default": 'Prev'
    },
    nextText: {
      type: String,
      "default": 'Next'
    },
    breakViewText: {
      type: String,
      "default": '…'
    },
    containerClass: {
      type: String
    },
    pageClass: {
      type: String
    },
    pageLinkClass: {
      type: String
    },
    prevClass: {
      type: String
    },
    prevLinkClass: {
      type: String
    },
    nextClass: {
      type: String
    },
    nextLinkClass: {
      type: String
    },
    breakViewClass: {
      type: String
    },
    breakViewLinkClass: {
      type: String
    },
    activeClass: {
      type: String,
      "default": 'active'
    },
    disabledClass: {
      type: String,
      "default": 'disabled'
    },
    noLiSurround: {
      type: Boolean,
      "default": false
    },
    firstLastButton: {
      type: Boolean,
      "default": false
    },
    firstButtonText: {
      type: String,
      "default": 'First'
    },
    lastButtonText: {
      type: String,
      "default": 'Last'
    },
    hidePrevNext: {
      type: Boolean,
      "default": false
    }
  },
  beforeUpdate: function beforeUpdate() {
    if (this.forcePage === undefined) return;

    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage;
    }
  },
  computed: {
    selected: {
      get: function get() {
        return this.value || this.innerValue;
      },
      set: function set(newValue) {
        this.innerValue = newValue;
      }
    },
    pages: function pages() {
      var _this = this;

      var items = {};

      if (this.pageCount <= this.pageRange) {
        for (var index = 0; index < this.pageCount; index++) {
          var page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1
          };
          items[index] = page;
        }
      } else {
        var halfPageRange = Math.floor(this.pageRange / 2);

        var setPageItem = function setPageItem(index) {
          var page = {
            index: index,
            content: index + 1,
            selected: index === _this.selected - 1
          };
          items[index] = page;
        };

        var setBreakView = function setBreakView(index) {
          var breakView = {
            disabled: true,
            breakView: true
          };
          items[index] = breakView;
        }; // 1st - loop thru low end of margin pages


        for (var i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        } // 2nd - loop thru selected range


        var selectedRangeLow = 0;

        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }

        var selectedRangeHigh = selectedRangeLow + this.pageRange - 1;

        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }

        for (var _i = selectedRangeLow; _i <= selectedRangeHigh && _i <= this.pageCount - 1; _i++) {
          setPageItem(_i);
        } // Check if there is breakView in the left of selected range


        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1);
        } // Check if there is breakView in the right of selected range


        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1);
        } // 3rd - loop thru high end of margin pages


        for (var _i2 = this.pageCount - 1; _i2 >= this.pageCount - this.marginPages; _i2--) {
          setPageItem(_i2);
        }
      }

      return items;
    }
  },
  data: function data() {
    return {
      innerValue: 1
    };
  },
  methods: {
    handlePageSelected: function handlePageSelected(selected) {
      if (this.selected === selected) return;
      this.innerValue = selected;
      this.$emit('input', selected);
      this.clickHandler(selected);
    },
    prevPage: function prevPage() {
      if (this.selected <= 1) return;
      this.handlePageSelected(this.selected - 1);
    },
    nextPage: function nextPage() {
      if (this.selected >= this.pageCount) return;
      this.handlePageSelected(this.selected + 1);
    },
    firstPageSelected: function firstPageSelected() {
      return this.selected === 1;
    },
    lastPageSelected: function lastPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0;
    },
    selectFirstPage: function selectFirstPage() {
      if (this.selected <= 1) return;
      this.handlePageSelected(1);
    },
    selectLastPage: function selectLastPage() {
      if (this.selected >= this.pageCount) return;
      this.handlePageSelected(this.pageCount);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/additional-actions.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/additional-actions.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "additional-actions",
  data: function data() {
    return {
      opened: false
    };
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  watch: {
    opened: function opened(value) {
      var _this = this;

      if (!value) return;

      var clickOutside = function clickOutside(event) {
        if (!_this.$refs['wrapper'].contains(event.target)) {
          _this.opened = false;
          window.removeEventListener('click', clickOutside);
        }
      };

      window.addEventListener('click', clickOutside);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/filters/filter-wrapper.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/filters/filter-wrapper.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "filter-wrapper",
  data: function data() {
    return {
      hasFocus: false
    };
  },
  props: {
    position: {
      "default": "",
      type: String
    },
    labelClasses: {
      "default": "",
      type: String
    },
    contentClasses: {
      "default": "",
      type: String
    }
  },
  computed: {
    getOutSideClickHandler: function getOutSideClickHandler() {
      var _this = this;

      return function (event) {
        if (!_this.$refs['wrapper'].contains(event.target)) {
          _this.hasFocus = false;
          setTimeout(function () {
            window.removeEventListener('click', _this.getOutSideClickHandler);
          });
        }
      };
    }
  },
  watch: {
    hasFocus: function hasFocus(value) {
      if (value) {
        window.addEventListener('click', this.getOutSideClickHandler);
      } else {
        window.removeEventListener('click', this.getOutSideClickHandler);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/filters/hubble-filter.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/filters/hubble-filter.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filter_wrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter-wrapper */ "./resources/js/components/filters/filter-wrapper.vue");
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "hubble-filter",
  data: function data() {
    return {
      originalsOptions: [],
      filterOptions: []
    };
  },
  components: {
    FilterWrapper: _filter_wrapper__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    filter: {
      type: Object,
      required: true
    },
    value: {
      "default": undefined
    }
  },
  methods: {
    fetchData: function fetchData() {
      var _this = this;

      if (Array.isArray(this.filter.options)) {
        this.originalsOptions = this.filter.options;
        this.filterOptions = this.filter.options;
        return;
      }

      this.$axios.get(this.filter.options).then(function (res) {
        _this.filterOptions = res.data.data || res.data;
        _this.originalsOptions = _this.filterOptions;
      });
    },
    getCustomFilterText: function getCustomFilterText(filter) {
      if (!this.value || filter.multiple) return filter.title;
      return this.value[filter.textKey] || filter.title;
    },
    search: function search(query) {
      var _this2 = this;

      if (!query) {
        this.filterOptions = this.originalsOptions;
        return;
      }

      this.filterOptions = this.originalsOptions.filter(function (it) {
        return String(it[_this2.filter.attributes.textKey]).toLowerCase().includes(String(query).toLowerCase());
      });
    }
  },
  created: function created() {
    this.fetchData();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/v-modal.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/v-modal.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "v-modal",
  props: {
    label: {
      type: String,
      "default": ''
    },
    cardClasses: {
      type: String,
      "default": ''
    }
  },
  methods: {
    close: function close() {
      this.$emit('close');
      this.$emit('input', false);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/hubble-index.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/hubble-index.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_v_modal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/v-modal.vue */ "./resources/js/components/v-modal.vue");
/* harmony import */ var _components_VPagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/VPagination */ "./resources/js/components/VPagination.vue");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./resources/js/utils.js");
/* harmony import */ var _components_additional_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/additional-actions */ "./resources/js/components/additional-actions.vue");
/* harmony import */ var _components_filters_hubble_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/filters/hubble-filter */ "./resources/js/components/filters/hubble-filter.vue");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 // import CheckboxFilter from "../search/checkbox-filter";



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "hubble-index",
  data: function data() {
    return {
      items: [],
      filtersOptions: {},
      fetching: true,
      removing: false,
      selected: [],
      page: 1,
      action: null,
      itemToRemove: null,
      deleteItemModal: false,
      actionModalConfirmation: false,
      runningAction: false,
      lastPage: 0,
      total: 0,
      searchTimer: null,
      customFilters: {},
      filters: {
        sort: {
          by: null,
          type: null
        },
        search: null
      },
      attachModalState: false,
      itemToAttach: null,
      attaching: false
    };
  },
  components: {
    HubbleFilter: _components_filters_hubble_filter__WEBPACK_IMPORTED_MODULE_4__["default"],
    AdditionalActions: _components_additional_actions__WEBPACK_IMPORTED_MODULE_3__["default"],
    VPagination: _components_VPagination__WEBPACK_IMPORTED_MODULE_1__["default"],
    VModal: _components_v_modal_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    resource: {
      type: Object,
      required: true
    }
  },
  computed: {
    isEmpty: function isEmpty() {
      return this.items.length === 0 && this.fetching === false;
    },
    isAllSelected: function isAllSelected() {
      return this.selected.length === this.items.length;
    },
    key: function key() {
      return this.resource.key || 'id';
    },
    currentAction: function currentAction() {
      if (this.action === null || this.action === undefined) return null;
      return this.resource.actions[this.action];
    },
    url: function url() {
      var _this = this;

      var params = _objectSpread(_objectSpread({}, this.filters), {}, {
        page: this.page
      });

      var filters = this.resource.filters || [];
      filters.forEach(function (filter) {
        if (!_this.customFilters[filter.name]) return;
        params[filter.name] = Array.isArray(_this.customFilters[filter.name]) ? _this.customFilters[filter.name].map(function (it) {
          return it[filter.attributes.valueKey];
        }) : _this.customFilters[filter.name][filter.attributes.valueKey];
      });
      return this.resource.urls.api.index + '?' + Object(_utils__WEBPACK_IMPORTED_MODULE_2__["encodeUrl"])(params);
    },
    fields: function fields() {
      return Object.values(this.resource.fields);
    }
  },
  methods: {
    fetchItems: function fetchItems() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.fetching = true;
      this.$axios.get(this.url + "&".concat(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["encodeUrl"])(params))).then(function (res) {
        _this2.items = res.data.data;
        _this2.lastPage = res.data.meta.last_page;
        _this2.total = res.data.meta.total;
      })["finally"](function (_) {
        _this2.fetching = false;
      });
    },
    select: function select(item) {
      var _this3 = this;

      var index = this.selected.findIndex(function (it) {
        return it === item[_this3.key];
      });
      if (index === -1) this.selected.push(item[this.key]);else this.selected.splice(index, 1);
    },
    isSelected: function isSelected(item) {
      var _this4 = this;

      var index = this.selected.findIndex(function (it) {
        return it === item[_this4.key];
      });
      return index !== -1;
    },
    selectAll: function selectAll() {
      var _this5 = this;

      if (this.isAllSelected) {
        this.selected = [];
        return;
      }

      this.selected = this.items.map(function (it) {
        return it[_this5.key];
      });
    },
    runAction: function runAction() {
      var _this6 = this;

      var confirmed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.currentAction) return;

      if (this.currentAction.confirm_message && !confirmed) {
        this.actionModalConfirmation = true;
        return false;
      }

      this.actionModalConfirmation = false;
      this.runningAction = true;
      return this.$axios.post(this.currentAction.url, {
        items: this.selected
      }).then(function (res) {
        _this6.selected = [];

        _this6.fetchItems({
          'after-running-action': true
        });
      })["finally"](function (_) {
        _this6.runningAction = false;
      });
    },
    paginate: function paginate(page) {
      this.page = page;
      this.fetchItems();
      document.querySelector('.admin-dashboard--content').scroll(0, 0);
    },
    isSortedBy: function isSortedBy(field) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (this.filters.sort.by !== field) return false;
      if (!type) return true;
      return this.filters.sort.type === type;
    },
    sortBy: function sortBy(field) {
      if (!this.isSortedBy(field)) {
        this.filters.sort = {
          by: field,
          type: 'asc'
        };
        return;
      }

      if (this.isSortedBy(field, 'asc')) {
        this.filters.sort = {
          by: field,
          type: 'desc'
        };
        return;
      }

      if (this.isSortedBy(field, 'desc')) {
        this.filters.sort = {
          by: null,
          type: null
        };
        return;
      }
    },
    search: function search(event) {
      var _this7 = this;

      var query = event.target.value;
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(function () {
        _this7.filters.search = query; // this.fetchItems();
      }, 350);
    },
    selectFilter: function selectFilter(filter, value) {
      this.$set(this.customFilters, filter.name, value);
    },
    setItemToRemove: function setItemToRemove(item, index) {
      this.itemToRemove = {
        value: item,
        index: index
      };
      this.deleteItemModal = true;
    },
    removeItem: function removeItem() {
      var _this8 = this;

      if (!this.itemToRemove) return;
      this.removing = true;
      this.$axios["delete"](this.itemToRemove.value['@urls']['delete']['url']).then(function (res) {
        _this8.items.splice(_this8.itemToRemove.index, 1);

        _this8.itemToRemove = null;
        _this8.deleteItemModal = false;
      })["finally"](function (_) {
        _this8.removing = false;
      });
    },
    attach: function attach() {
      this.attachModalState = true;
    },
    attachItem: function attachItem() {
      var _this9 = this;

      if (!this.itemToAttach) return;
      var value = this.itemToAttach[this.resource.field.attributes.valueKey];
      this.attaching = true;
      this.$axios.post(this.itemToAttach['attach_url'], {
        id: value
      }).then(function (res) {
        _this9.attachModalState = false;

        _this9.fetchItems();

        _this9.itemToAttach = null;
      })["finally"](function (_) {
        _this9.attaching = false;
      });
    }
  },
  watch: {
    filters: {
      handler: function handler() {
        this.page = 1;
        this.fetchItems();
      },
      deep: true
    },
    customFilters: {
      handler: function handler() {
        this.page = 1;
        this.fetchItems();
      },
      deep: true
    }
  },
  created: function created() {
    this.fetchItems();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VPagination.vue?vue&type=template&id=228c9b95&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/VPagination.vue?vue&type=template&id=228c9b95& ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.noLiSurround
    ? _c(
        "ul",
        { class: _vm.containerClass },
        [
          _vm.firstLastButton
            ? _c(
                "li",
                {
                  class: [
                    _vm.pageClass,
                    _vm.firstPageSelected() ? _vm.disabledClass : ""
                  ]
                },
                [
                  _c("a", {
                    class: _vm.pageLinkClass,
                    attrs: { tabindex: _vm.firstPageSelected() ? -1 : 0 },
                    domProps: { innerHTML: _vm._s(_vm.firstButtonText) },
                    on: {
                      click: function($event) {
                        return _vm.selectFirstPage()
                      },
                      keyup: function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.selectFirstPage()
                      }
                    }
                  })
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          !(_vm.firstPageSelected() && _vm.hidePrevNext)
            ? _c(
                "li",
                {
                  class: [
                    _vm.prevClass,
                    _vm.firstPageSelected() ? _vm.disabledClass : ""
                  ]
                },
                [
                  _c("a", {
                    class: _vm.prevLinkClass,
                    attrs: { tabindex: _vm.firstPageSelected() ? -1 : 0 },
                    domProps: { innerHTML: _vm._s(_vm.prevText) },
                    on: {
                      click: function($event) {
                        return _vm.prevPage()
                      },
                      keyup: function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.prevPage()
                      }
                    }
                  })
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.pages, function(page) {
            return _c(
              "li",
              {
                class: [
                  _vm.pageClass,
                  page.selected ? _vm.activeClass : "",
                  page.disabled ? _vm.disabledClass : "",
                  page.breakView ? _vm.breakViewClass : ""
                ]
              },
              [
                page.breakView
                  ? _c(
                      "a",
                      {
                        class: [_vm.pageLinkClass, _vm.breakViewLinkClass],
                        attrs: { tabindex: "0" }
                      },
                      [
                        _vm._t("breakViewContent", [
                          _vm._v(_vm._s(_vm.breakViewText))
                        ])
                      ],
                      2
                    )
                  : page.disabled
                  ? _c(
                      "a",
                      { class: _vm.pageLinkClass, attrs: { tabindex: "0" } },
                      [_vm._v(_vm._s(page.content))]
                    )
                  : _c(
                      "a",
                      {
                        class: _vm.pageLinkClass,
                        attrs: { tabindex: "0" },
                        on: {
                          click: function($event) {
                            return _vm.handlePageSelected(page.index + 1)
                          },
                          keyup: function($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k(
                                $event.keyCode,
                                "enter",
                                13,
                                $event.key,
                                "Enter"
                              )
                            ) {
                              return null
                            }
                            return _vm.handlePageSelected(page.index + 1)
                          }
                        }
                      },
                      [_vm._v(_vm._s(page.content))]
                    )
              ]
            )
          }),
          _vm._v(" "),
          !(_vm.lastPageSelected() && _vm.hidePrevNext)
            ? _c(
                "li",
                {
                  class: [
                    _vm.nextClass,
                    _vm.lastPageSelected() ? _vm.disabledClass : ""
                  ]
                },
                [
                  _c("a", {
                    class: _vm.nextLinkClass,
                    attrs: { tabindex: _vm.lastPageSelected() ? -1 : 0 },
                    domProps: { innerHTML: _vm._s(_vm.nextText) },
                    on: {
                      click: function($event) {
                        return _vm.nextPage()
                      },
                      keyup: function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.nextPage()
                      }
                    }
                  })
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.firstLastButton
            ? _c(
                "li",
                {
                  class: [
                    _vm.pageClass,
                    _vm.lastPageSelected() ? _vm.disabledClass : ""
                  ]
                },
                [
                  _c("a", {
                    class: _vm.pageLinkClass,
                    attrs: { tabindex: _vm.lastPageSelected() ? -1 : 0 },
                    domProps: { innerHTML: _vm._s(_vm.lastButtonText) },
                    on: {
                      click: function($event) {
                        return _vm.selectLastPage()
                      },
                      keyup: function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.selectLastPage()
                      }
                    }
                  })
                ]
              )
            : _vm._e()
        ],
        2
      )
    : _c(
        "div",
        { class: _vm.containerClass },
        [
          _vm.firstLastButton
            ? _c("a", {
                class: [
                  _vm.pageLinkClass,
                  _vm.firstPageSelected() ? _vm.disabledClass : ""
                ],
                attrs: { tabindex: "0" },
                domProps: { innerHTML: _vm._s(_vm.firstButtonText) },
                on: {
                  click: function($event) {
                    return _vm.selectFirstPage()
                  },
                  keyup: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.selectFirstPage()
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          !(_vm.firstPageSelected() && _vm.hidePrevNext)
            ? _c("a", {
                class: [
                  _vm.prevLinkClass,
                  _vm.firstPageSelected() ? _vm.disabledClass : ""
                ],
                attrs: { tabindex: "0" },
                domProps: { innerHTML: _vm._s(_vm.prevText) },
                on: {
                  click: function($event) {
                    return _vm.prevPage()
                  },
                  keyup: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.prevPage()
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.pages, function(page) {
            return [
              page.breakView
                ? _c(
                    "a",
                    {
                      class: [
                        _vm.pageLinkClass,
                        _vm.breakViewLinkClass,
                        page.disabled ? _vm.disabledClass : ""
                      ],
                      attrs: { tabindex: "0" }
                    },
                    [
                      _vm._t("breakViewContent", [
                        _vm._v(_vm._s(_vm.breakViewText))
                      ])
                    ],
                    2
                  )
                : page.disabled
                ? _c(
                    "a",
                    {
                      class: [
                        _vm.pageLinkClass,
                        page.selected ? _vm.activeClass : "",
                        _vm.disabledClass
                      ],
                      attrs: { tabindex: "0" }
                    },
                    [_vm._v(_vm._s(page.content))]
                  )
                : _c(
                    "a",
                    {
                      class: [
                        _vm.pageLinkClass,
                        page.selected ? _vm.activeClass : ""
                      ],
                      attrs: { tabindex: "0" },
                      on: {
                        click: function($event) {
                          return _vm.handlePageSelected(page.index + 1)
                        },
                        keyup: function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          return _vm.handlePageSelected(page.index + 1)
                        }
                      }
                    },
                    [_vm._v(_vm._s(page.content))]
                  )
            ]
          }),
          _vm._v(" "),
          !(_vm.lastPageSelected() && _vm.hidePrevNext)
            ? _c("a", {
                class: [
                  _vm.nextLinkClass,
                  _vm.lastPageSelected() ? _vm.disabledClass : ""
                ],
                attrs: { tabindex: "0" },
                domProps: { innerHTML: _vm._s(_vm.nextText) },
                on: {
                  click: function($event) {
                    return _vm.nextPage()
                  },
                  keyup: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.nextPage()
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.firstLastButton
            ? _c("a", {
                class: [
                  _vm.pageLinkClass,
                  _vm.lastPageSelected() ? _vm.disabledClass : ""
                ],
                attrs: { tabindex: "0" },
                domProps: { innerHTML: _vm._s(_vm.lastButtonText) },
                on: {
                  click: function($event) {
                    return _vm.selectLastPage()
                  },
                  keyup: function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.selectLastPage()
                  }
                }
              })
            : _vm._e()
        ],
        2
      )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/additional-actions.vue?vue&type=template&id=cabc713c&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/additional-actions.vue?vue&type=template&id=cabc713c&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "wrapper",
      staticClass: "additional--actions--wrapper",
      class: { active: _vm.opened }
    },
    [
      _c(
        "svg",
        {
          attrs: {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg"
          },
          on: {
            click: function($event) {
              $event.stopPropagation()
              _vm.opened = !_vm.opened
            }
          }
        },
        [
          _c("path", {
            attrs: {
              d:
                "M12 7.5C12.8284 7.5 13.5 6.82843 13.5 6C13.5 5.17157 12.8284 4.5 12 4.5C11.1716 4.5 10.5 5.17157 10.5 6C10.5 6.82843 11.1716 7.5 12 7.5Z"
            }
          }),
          _vm._v(" "),
          _c("path", {
            attrs: {
              d:
                "M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z"
            }
          }),
          _vm._v(" "),
          _c("path", {
            attrs: {
              d:
                "M12 19.5C12.8284 19.5 13.5 18.8284 13.5 18C13.5 17.1716 12.8284 16.5 12 16.5C11.1716 16.5 10.5 17.1716 10.5 18C10.5 18.8284 11.1716 19.5 12 19.5Z"
            }
          })
        ]
      ),
      _vm._v(" "),
      _c(
        "ul",
        { staticClass: "additional--dropdown" },
        _vm._l(_vm.options, function(option) {
          return _c("li", { key: option.url, staticClass: "link--wrapper" }, [
            _c(
              "a",
              {
                staticClass: "link",
                attrs: { href: option.url, target: option.target || "_self" }
              },
              [_vm._v(_vm._s(option.title))]
            )
          ])
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/filters/filter-wrapper.vue?vue&type=template&id=430e96dd&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/filters/filter-wrapper.vue?vue&type=template&id=430e96dd&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _obj
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "wrapper", staticClass: "search--filter--wrapper" }, [
    _c(
      "button",
      {
        staticClass: "label",
        class: _vm.labelClasses,
        attrs: { type: "button" },
        on: {
          click: function($event) {
            _vm.hasFocus = !_vm.hasFocus
          }
        }
      },
      [
        _c(
          "span",
          { staticClass: "label-content" },
          [
            _vm._t("label"),
            _vm._v(" "),
            _c("svg", { attrs: { viewBox: "0 0 16 16" } }, [
              _c("path", {
                attrs: { d: "M8 12L2 6h12z", fill: "currentColor" }
              })
            ])
          ],
          2
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.hasFocus,
            expression: "hasFocus"
          }
        ],
        staticClass: "content ",
        class:
          ((_obj = {}),
          (_obj[_vm.position] = true),
          (_obj[_vm.contentClasses] = true),
          _obj)
      },
      [_vm._t("content")],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/filters/hubble-filter.vue?vue&type=template&id=3869c910&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/filters/hubble-filter.vue?vue&type=template&id=3869c910&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("filter-wrapper", {
    scopedSlots: _vm._u([
      {
        key: "label",
        fn: function() {
          return [_vm._v(_vm._s(_vm.filter.title))]
        },
        proxy: true
      },
      {
        key: "content",
        fn: function() {
          return [
            _c(
              _vm.filter.component,
              _vm._b(
                {
                  tag: "component",
                  attrs: {
                    value: _vm.value,
                    options: _vm.filterOptions,
                    multiple: _vm.filter.multiple,
                    name: _vm.filter.name
                  },
                  on: {
                    input: function($event) {
                      return _vm.$emit("input", $event)
                    },
                    search: _vm.search
                  }
                },
                "component",
                _vm.filter.attributes,
                false
              )
            )
          ]
        },
        proxy: true
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/v-modal.vue?vue&type=template&id=f088b5ca&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/v-modal.vue?vue&type=template&id=f088b5ca& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _obj
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "model--wrapper" }, [
    _c(
      "div",
      {
        staticClass: "modal--card",
        class: ((_obj = {}), (_obj[_vm.cardClasses] = true), _obj)
      },
      [
        _c("div", { staticClass: "modal--card-header" }, [
          _c(
            "div",
            [
              _vm._t("header", [
                _c("span", { staticClass: "title" }, [
                  _vm._v(_vm._s(_vm.label))
                ])
              ])
            ],
            2
          ),
          _vm._v(" "),
          _c("div", { staticClass: "close-btn--wrapper" }, [
            _c(
              "button",
              {
                staticClass: "close-btn",
                attrs: { type: "button" },
                on: { click: _vm.close }
              },
              [
                _c(
                  "svg",
                  {
                    attrs: {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 14 14",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        d:
                          "M8.40994 7L12.7099 2.71C12.8982 2.5217 13.004 2.2663 13.004 2C13.004 1.7337 12.8982 1.47831 12.7099 1.29C12.5216 1.1017 12.2662 0.995911 11.9999 0.995911C11.7336 0.995911 11.4782 1.1017 11.2899 1.29L6.99994 5.59L2.70994 1.29C2.52164 1.1017 2.26624 0.995911 1.99994 0.995911C1.73364 0.995911 1.47824 1.1017 1.28994 1.29C1.10164 1.47831 0.995847 1.7337 0.995847 2C0.995847 2.2663 1.10164 2.5217 1.28994 2.71L5.58994 7L1.28994 11.29C1.19621 11.383 1.12182 11.4936 1.07105 11.6154C1.02028 11.7373 0.994141 11.868 0.994141 12C0.994141 12.132 1.02028 12.2627 1.07105 12.3846C1.12182 12.5064 1.19621 12.617 1.28994 12.71C1.3829 12.8037 1.4935 12.8781 1.61536 12.9289C1.73722 12.9797 1.86793 13.0058 1.99994 13.0058C2.13195 13.0058 2.26266 12.9797 2.38452 12.9289C2.50638 12.8781 2.61698 12.8037 2.70994 12.71L6.99994 8.41L11.2899 12.71C11.3829 12.8037 11.4935 12.8781 11.6154 12.9289C11.7372 12.9797 11.8679 13.0058 11.9999 13.0058C12.132 13.0058 12.2627 12.9797 12.3845 12.9289C12.5064 12.8781 12.617 12.8037 12.7099 12.71C12.8037 12.617 12.8781 12.5064 12.9288 12.3846C12.9796 12.2627 13.0057 12.132 13.0057 12C13.0057 11.868 12.9796 11.7373 12.9288 11.6154C12.8781 11.4936 12.8037 11.383 12.7099 11.29L8.40994 7Z",
                        fill: "black"
                      }
                    })
                  ]
                )
              ]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "modal--card-body" }, [_vm._t("body")], 2),
        _vm._v(" "),
        _c("div", { staticClass: "modal--card-footer" }, [_vm._t("footer")], 2)
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/hubble-index.vue?vue&type=template&id=466b5aee&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/hubble-index.vue?vue&type=template&id=466b5aee& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container dashboard--container dashboard--index" },
    [
      _c("header", { staticClass: "header" }, [
        _c("h2", { staticClass: "title" }, [
          _vm._v(_vm._s(_vm.resource.title))
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "filters" },
          _vm._l(_vm.resource.filters || [], function(filter, k) {
            return _c(
              "div",
              { key: "filter-" + k },
              [
                _c("hubble-filter", {
                  attrs: {
                    filter: filter,
                    value: _vm.customFilters[filter.name]
                  },
                  on: {
                    input: function($event) {
                      return _vm.selectFilter(filter, $event)
                    }
                  }
                })
              ],
              1
            )
          }),
          0
        )
      ]),
      _vm._v(" "),
      _c(
        "section",
        { staticClass: "content--list" },
        [
          _c("div", { staticClass: "total--wrapper" }, [
            _c("div", { staticClass: "total" }, [
              _vm.total > 0
                ? _c("span", [
                    _vm._v(
                      "\n                    " +
                        _vm._s(
                          _vm.$t("dashboard.results", { total: _vm.total })
                        ) +
                        "\n                "
                    )
                  ])
                : _vm._e()
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "actions--header",
              class: { "not-searchable": !_vm.resource.searchable }
            },
            [
              _vm.resource.searchable
                ? _c("div", { staticClass: "search--input--wrapper" }, [
                    _c(
                      "svg",
                      {
                        attrs: {
                          width: "19",
                          height: "19",
                          viewBox: "0 0 19 19",
                          xmlns: "http://www.w3.org/2000/svg"
                        }
                      },
                      [
                        _c("path", {
                          attrs: {
                            d:
                              "M19 17L13.846 11.846C14.7988 10.3979 15.1804 8.64774 14.917 6.93442C14.6535 5.22111 13.7637 3.66648 12.4199 2.57154C11.076 1.47659 9.37366 0.919227 7.64245 1.00735C5.91123 1.09547 4.27429 1.82281 3.04855 3.04855C1.82281 4.27429 1.09547 5.91123 1.00735 7.64245C0.919227 9.37366 1.47659 11.076 2.57154 12.4199C3.66648 13.7637 5.22111 14.6535 6.93442 14.917C8.64774 15.1804 10.3979 14.7988 11.846 13.846L17 19L19 17ZM2.99998 7.99998C2.99998 5.24298 5.24298 2.99998 7.99998 2.99998C10.757 2.99998 13 5.24298 13 7.99998C13 10.757 10.757 13 7.99998 13C5.24298 13 2.99998 10.757 2.99998 7.99998Z"
                          }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c("input", {
                      attrs: {
                        type: "text",
                        placeholder: _vm.$t("dashboard.search_placeholder")
                      },
                      on: { input: _vm.search }
                    })
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "actions--header--right" }, [
                _vm.resource.actions &&
                _vm.resource.actions.length > 0 &&
                _vm.selected.length > 0
                  ? _c("div", { staticClass: "resources--actions--wrapper" }, [
                      _c(
                        "label",
                        { staticClass: "resources--actions--wrapper" },
                        [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.action,
                                  expression: "action"
                                }
                              ],
                              attrs: { name: "action", id: "action" },
                              on: {
                                change: function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.action = $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                }
                              }
                            },
                            [
                              _c(
                                "option",
                                {
                                  attrs: { selected: "" },
                                  domProps: { value: null }
                                },
                                [
                                  _vm._v(
                                    " " +
                                      _vm._s(
                                        _vm.$t("dashboard.choose_an_action")
                                      )
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _vm._l(_vm.resource.actions, function(action, k) {
                                return _c(
                                  "option",
                                  {
                                    key: "action-" + k,
                                    domProps: { value: k }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(action.title) +
                                        "\n                            "
                                    )
                                  ]
                                )
                              })
                            ],
                            2
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-coral btn-radius btn-icon",
                          on: {
                            click: function($event) {
                              return _vm.runAction(false)
                            }
                          }
                        },
                        [
                          _c(
                            "svg",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !_vm.runningAction,
                                  expression: "!runningAction"
                                }
                              ],
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                fill: "white",
                                width: "24px",
                                height: "24px"
                              }
                            },
                            [_c("path", { attrs: { d: "M8 5v14l11-7z" } })]
                          ),
                          _vm._v(" "),
                          _c(
                            "svg",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.runningAction,
                                  expression: "runningAction"
                                }
                              ],
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "24",
                                height: "24",
                                viewBox: "0 0 120 30",
                                fill: "#fff"
                              }
                            },
                            [
                              _c(
                                "circle",
                                { attrs: { cx: "15", cy: "15", r: "14.7499" } },
                                [
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "r",
                                      from: "15",
                                      to: "15",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "15;9;15",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "fill-opacity",
                                      from: "1",
                                      to: "1",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "1;.5;1",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "circle",
                                {
                                  attrs: {
                                    cx: "60",
                                    cy: "15",
                                    r: "9.25014",
                                    "fill-opacity": "0.3"
                                  }
                                },
                                [
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "r",
                                      from: "9",
                                      to: "9",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "9;15;9",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "fill-opacity",
                                      from: "0.5",
                                      to: "0.5",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: ".5;1;.5",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "circle",
                                {
                                  attrs: { cx: "105", cy: "15", r: "14.7499" }
                                },
                                [
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "r",
                                      from: "15",
                                      to: "15",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "15;9;15",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "fill-opacity",
                                      from: "1",
                                      to: "1",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "1;.5;1",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                !_vm.resource.isManyRelation
                  ? _c(
                      "a",
                      {
                        staticClass:
                          "create-btn btn btn-radius btn-primary btn-normal",
                        attrs: {
                          href: _vm.resource.urls.create.url,
                          target: _vm.resource.urls.create.target
                        }
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.$t("dashboard.create")) +
                            "\n                "
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.resource.isManyRelation
                  ? _c(
                      "button",
                      {
                        staticClass:
                          "create-btn btn btn-radius btn-primary btn-normal",
                        on: { click: _vm.attach }
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.$t("dashboard.attach")) +
                            "\n                "
                        )
                      ]
                    )
                  : _vm._e()
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "ol",
            {
              staticClass: "table--list",
              class: {
                "has-actions":
                  _vm.resource.actions &&
                  _vm.resource.actions.length > 0 &&
                  _vm.selected.length > 0
              }
            },
            [
              _c(
                "li",
                { staticClass: "table--list--row list--header" },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "fake-checkbox--wrapper table--list--cell table--header--cell table--select--all"
                    },
                    [
                      _c("div", {
                        staticClass: "fake-checkbox",
                        class: { active: _vm.isAllSelected },
                        on: {
                          click: function($event) {
                            return _vm.selectAll()
                          }
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.fields, function(field) {
                    var _obj
                    return _c(
                      "div",
                      {
                        key: field.name,
                        staticClass: "table--list--cell table--header--cell",
                        class:
                          ((_obj = {}),
                          (_obj["table--" + field.name + "-header"] = true),
                          (_obj["numeric-field"] =
                            field.attributes.is_numeric || false),
                          _obj)
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "table--header--cell--content",
                            on: {
                              click: function($event) {
                                field.sortable ? _vm.sortBy(field.name) : null
                              }
                            }
                          },
                          [
                            field.sortable
                              ? [
                                  !_vm.isSortedBy(field.name)
                                    ? _c(
                                        "svg",
                                        {
                                          attrs: {
                                            height: "20px",
                                            viewBox: "0 0 64 64",
                                            width: "20px",
                                            xmlns: "http://www.w3.org/2000/svg"
                                          }
                                        },
                                        [
                                          _c("path", {
                                            attrs: {
                                              d:
                                                "m31.414 15.586-7-7c-.78-.781-2.048-.781-2.828 0l-7 7c-.781.781-.781 2.047 0 2.828.78.781 2.048.781 2.828 0l3.586-3.586v39.172c0 1.104.896 2 2 2s2-.896 2-2v-39.172l3.586 3.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828z"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c("path", {
                                            attrs: {
                                              d:
                                                "m49.414 45.586c-.781-.781-2.047-.781-2.828 0l-3.586 3.586v-39.172c0-1.104-.896-2-2-2s-2 .896-2 2v39.172l-3.586-3.586c-.781-.781-2.048-.781-2.828 0-.781.781-.781 2.047 0 2.828l7 7c.391.391.902.586 1.414.586s1.023-.195 1.414-.586l7-7c.781-.781.781-2.047 0-2.828z"
                                            }
                                          })
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.isSortedBy(field.name, "desc")
                                    ? _c(
                                        "svg",
                                        {
                                          attrs: {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            width: "24px",
                                            height: "24px"
                                          }
                                        },
                                        [
                                          _c("path", {
                                            attrs: { d: "M7 10l5 5 5-5z" }
                                          })
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.isSortedBy(field.name, "asc")
                                    ? _c(
                                        "svg",
                                        {
                                          attrs: {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            width: "24px",
                                            height: "24px"
                                          }
                                        },
                                        [
                                          _c("path", {
                                            attrs: { d: "M7 14l5-5 5 5z" }
                                          })
                                        ]
                                      )
                                    : _vm._e()
                                ]
                              : _vm._e(),
                            _vm._v(" "),
                            _c("span", { staticClass: "name" }, [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(field.title) +
                                  "\n                        "
                              )
                            ])
                          ],
                          2
                        )
                      ]
                    )
                  }),
                  _vm._v(" "),
                  _c("div", {
                    staticClass: "table--list--cell table--header--cell"
                  })
                ],
                2
              ),
              _vm._v(" "),
              _vm._l(_vm.items, function(item, k) {
                return _c(
                  "li",
                  {
                    key: "item-" + k,
                    staticClass: "table--list--row table--list--item",
                    class: { selected: _vm.isSelected(item) },
                    on: {
                      click: function($event) {
                        return _vm.select(item)
                      }
                    }
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "fake-checkbox--wrapper table--list--data"
                      },
                      [
                        _c("div", {
                          staticClass: "fake-checkbox",
                          class: { active: _vm.isSelected(item) }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.fields, function(field) {
                      var _obj
                      return _c(
                        "div",
                        {
                          key: "table-row--" + k + "-" + field.name,
                          staticClass: "table--list--data",
                          class:
                            ((_obj = {}),
                            (_obj["table--" + field.name] = true),
                            _obj)
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "table--list--data--content" },
                            [
                              _c(
                                field.components.index,
                                _vm._b(
                                  {
                                    tag: "component",
                                    attrs: {
                                      field: field,
                                      value: item[field.name],
                                      data: item
                                    }
                                  },
                                  "component",
                                  field.attributes,
                                  false
                                )
                              )
                            ],
                            1
                          )
                        ]
                      )
                    }),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "table--list--data table--list--data--actions"
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "wrapper" },
                          [
                            item["@urls"]["show"] &&
                            item["@urls"]["show"]["url"]
                              ? _c(
                                  "a",
                                  {
                                    attrs: {
                                      href: item["@urls"]["show"]["url"],
                                      target:
                                        item["@urls"]["show"]["target"] ||
                                        "_self",
                                      title: _vm.$t("dashboard.show_details")
                                    }
                                  },
                                  [
                                    _c(
                                      "svg",
                                      {
                                        attrs: {
                                          width: "24",
                                          height: "12",
                                          viewBox: "0 0 24 12",
                                          xmlns: "http://www.w3.org/2000/svg"
                                        }
                                      },
                                      [
                                        _c("path", {
                                          attrs: {
                                            d:
                                              "M11.9999 0C5.74794 0 0.937443 5.508 0.937443 5.508L0.491943 6L0.937443 6.492C0.937443 6.492 5.32344 11.493 11.1562 11.9535C11.4344 11.988 11.7127 12 11.9999 12C12.2872 12 12.5654 11.988 12.8437 11.9528C18.6764 11.493 23.0624 6.49275 23.0624 6.49275L23.5079 6L23.0624 5.508C23.0624 5.508 18.2519 0 11.9999 0ZM11.9999 1.5C13.6522 1.5 15.1754 1.9515 16.4999 2.5545C16.9777 3.34575 17.2499 4.257 17.2499 5.25C17.2531 6.54284 16.7788 7.79132 15.918 8.75593C15.0572 9.72053 13.8706 10.3333 12.5857 10.4767C12.5707 10.4797 12.5534 10.4737 12.5392 10.4767C12.3599 10.485 12.1814 10.5 11.9999 10.5C11.8004 10.5 11.6077 10.488 11.4142 10.4767C10.1293 10.3333 8.94267 9.72053 8.08187 8.75593C7.22108 7.79132 6.74677 6.54284 6.74994 5.25C6.74994 4.27125 7.01394 3.36 7.47669 2.57775H7.45344C8.78769 1.96275 10.3297 1.5 11.9999 1.5ZM11.9999 3C11.403 3.0002 10.8306 3.23752 10.4086 3.65976C9.98668 4.082 9.74974 4.65456 9.74994 5.2515C9.75014 5.84844 9.98746 6.42084 10.4097 6.8428C10.8319 7.26476 11.4045 7.5017 12.0014 7.5015C12.297 7.5014 12.5897 7.44309 12.8627 7.32989C13.1357 7.21668 13.3838 7.05081 13.5927 6.84174C13.8017 6.63267 13.9674 6.38449 14.0804 6.11138C14.1934 5.83827 14.2515 5.54557 14.2514 5.25C14.2513 4.95443 14.193 4.66177 14.0798 4.38873C13.9666 4.1157 13.8008 3.86763 13.5917 3.6587C13.3826 3.44977 13.1344 3.28406 12.8613 3.17104C12.5882 3.05802 12.2955 2.9999 11.9999 3V3ZM5.43744 3.7035C5.31551 4.21004 5.25259 4.72899 5.24994 5.25C5.24994 6.5655 5.62494 7.79625 6.28119 8.83575C4.94979 8.0558 3.72808 7.10218 2.64819 6C3.49829 5.14237 4.43278 4.37272 5.43744 3.70275V3.7035ZM18.5624 3.7035C19.5671 4.37323 20.5016 5.14263 21.3517 6C20.2718 7.10218 19.0501 8.0558 17.7187 8.83575C18.3952 7.76233 18.7528 6.51881 18.7499 5.25C18.7499 4.71375 18.6794 4.2015 18.5624 3.70275V3.7035Z"
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            item["@urls"]["edit"] &&
                            item["@urls"]["edit"]["url"]
                              ? _c(
                                  "a",
                                  {
                                    attrs: {
                                      href: item["@urls"]["edit"]["url"],
                                      target:
                                        item["@urls"]["edit"]["target"] ||
                                        "_self",
                                      title: _vm.$t("dashboard.edit")
                                    }
                                  },
                                  [
                                    _c(
                                      "svg",
                                      {
                                        attrs: {
                                          width: "17",
                                          height: "16",
                                          viewBox: "0 0 17 16",
                                          xmlns: "http://www.w3.org/2000/svg"
                                        }
                                      },
                                      [
                                        _c("path", {
                                          attrs: {
                                            d:
                                              "M16.4001 3.33998L13.6601 0.59998C13.3024 0.264076 12.8338 0.0713388 12.3434 0.058432C11.8529 0.0455252 11.3748 0.213349 11.0001 0.52998L2.00005 9.52998C1.67682 9.85594 1.47556 10.2832 1.43005 10.74L1.00005 14.91C0.986582 15.0564 1.00559 15.2041 1.05571 15.3424C1.10584 15.4806 1.18585 15.6062 1.29005 15.71C1.38349 15.8027 1.49431 15.876 1.61615 15.9258C1.73798 15.9755 1.86845 16.0007 2.00005 16H2.09005L6.26005 15.62C6.71685 15.5745 7.14409 15.3732 7.47005 15.05L16.4701 6.04998C16.8194 5.68095 17.0082 5.18849 16.995 4.68052C16.9819 4.17254 16.768 3.69049 16.4001 3.33998V3.33998ZM6.08005 13.62L3.08005 13.9L3.35005 10.9L9.00005 5.31998L11.7001 8.01998L6.08005 13.62ZM13.0001 6.67998L10.3201 3.99998L12.2701 1.99998L15.0001 4.72998L13.0001 6.67998Z"
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            item["@urls"]["delete"]
                              ? _c(
                                  "div",
                                  {
                                    attrs: {
                                      title: _vm.resource.isManyRelation
                                        ? _vm.$t("dashboard.detach")
                                        : _vm.$t("dashboard.delete")
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.setItemToRemove(item, k)
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "svg",
                                      {
                                        attrs: {
                                          width: "19",
                                          height: "20",
                                          viewBox: "0 0 19 20",
                                          xmlns: "http://www.w3.org/2000/svg"
                                        }
                                      },
                                      [
                                        _c("path", {
                                          attrs: {
                                            d:
                                              "M2.00293 18C2.00293 19.103 2.89993 20 4.00293 20H14.0029C15.1059 20 16.0029 19.103 16.0029 18V6H18.0029V4H14.0029V2C14.0029 0.897 13.1059 0 12.0029 0H6.00293C4.89993 0 4.00293 0.897 4.00293 2V4H0.00292969V6H2.00293V18ZM6.00293 2H12.0029V4H6.00293V2ZM5.00293 6H14.0029L14.0039 18H4.00293V6H5.00293Z"
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("path", {
                                          attrs: {
                                            d:
                                              "M6.00293 8H8.00293V16H6.00293V8ZM10.0029 8H12.0029V16H10.0029V8Z"
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            (item["@urls"]["more"] || []).length > 0
                              ? _c("additional-actions", {
                                  attrs: { options: item["@urls"]["more"] }
                                })
                              : _vm._e()
                          ],
                          1
                        )
                      ]
                    )
                  ],
                  2
                )
              })
            ],
            2
          ),
          _vm._v(" "),
          _vm.isEmpty
            ? _c("div", { staticClass: "empty--states" }, [
                _c("div", { staticClass: "wrapper" }, [
                  _c(
                    "svg",
                    {
                      attrs: {
                        "enable-background": "new 0 0 24 24",
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg"
                      }
                    },
                    [
                      _c("g", [
                        _c("path", {
                          attrs: {
                            d:
                              "m7.323 10.5h-2.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("g", [
                        _c("path", {
                          attrs: {
                            d:
                              "m19.323 10.5h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("g", [
                        _c("path", {
                          attrs: {
                            d:
                              "m7.323 14.5h-2.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("g", [
                        _c("path", {
                          attrs: {
                            d:
                              "m19.323 14.5h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("g", [
                        _c("path", {
                          attrs: {
                            d:
                              "m7.323 18.5h-2.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("g", [
                        _c("path", {
                          attrs: {
                            d:
                              "m19.323 18.5h-7.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("g", [
                        _c("path", {
                          attrs: {
                            d:
                              "m21.25 23h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-16.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v16.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-20.5c-.689 0-1.25.561-1.25 1.25v16.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-16.5c0-.689-.561-1.25-1.25-1.25z"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("g", [
                        _c("path", {
                          attrs: {
                            d:
                              "m23.25 6h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                          }
                        })
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("h4", [_vm._v(_vm._s(_vm.$t("dashboard.empty_message")))])
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.lastPage > 1
            ? _c("v-pagination", {
                attrs: {
                  "page-count": _vm.lastPage,
                  "page-link-class": "item",
                  "disabled-class": "disabled",
                  value: _vm.page,
                  "prev-link-class": "item",
                  "next-link-class": "item",
                  "container-class": "pagination--container",
                  "prev-text": _vm.$t("dashboard.previous"),
                  "next-text": _vm.$t("dashboard.next")
                },
                on: { input: _vm.paginate }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _vm.actionModalConfirmation
        ? _c("v-modal", {
            attrs: { label: _vm.$t("dashboard.confirmation") },
            on: {
              close: function($event) {
                _vm.actionModalConfirmation = false
              }
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "body",
                  fn: function() {
                    return [
                      _c("p", {
                        domProps: {
                          innerHTML: _vm._s(_vm.currentAction.confirm_message)
                        }
                      })
                    ]
                  },
                  proxy: true
                },
                {
                  key: "footer",
                  fn: function() {
                    return [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-text btn-normal",
                          on: {
                            click: function($event) {
                              _vm.actionModalConfirmation = false
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.$t("dashboard.cancel")))]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-normal btn-primary",
                          on: {
                            click: function($event) {
                              return _vm.runAction(true)
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.$t("dashboard.confirm")))]
                      )
                    ]
                  },
                  proxy: true
                }
              ],
              null,
              false,
              810372985
            )
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.deleteItemModal
        ? _c("v-modal", {
            attrs: { label: _vm.$t("dashboard.confirmation") },
            on: {
              close: function($event) {
                _vm.deleteItemModal = false
              }
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "body",
                  fn: function() {
                    return [
                      _vm.resource.isManyRelation
                        ? _c("span", [
                            _vm._v(
                              _vm._s(_vm.$t("dashboard.detach_record_message"))
                            )
                          ])
                        : _c("span", [
                            _vm._v(
                              _vm._s(
                                _vm.$t("dashboard.delete_record_message")
                              ) + " "
                            )
                          ])
                    ]
                  },
                  proxy: true
                },
                {
                  key: "footer",
                  fn: function() {
                    return [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-normal btn-text",
                          on: {
                            click: function($event) {
                              _vm.deleteItemModal = false
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.$t("dashboard.cancel")))]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-normal btn-radius",
                          class: {
                            "btn-primary": !_vm.resource.isManyRelation,
                            "btn-coral": _vm.resource.isManyRelation
                          },
                          on: { click: _vm.removeItem }
                        },
                        [
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !_vm.removing,
                                  expression: "!removing"
                                }
                              ]
                            },
                            [
                              _vm.resource.isManyRelation
                                ? _c("span", [
                                    _vm._v(_vm._s(_vm.$t("dashboard.detach")))
                                  ])
                                : _c("span", [
                                    _vm._v(_vm._s(_vm.$t("dashboard.confirm")))
                                  ])
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "svg",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.removing,
                                  expression: "removing"
                                }
                              ],
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "24px",
                                height: "24px",
                                viewBox: "0 0 120 30",
                                fill: "#fff"
                              }
                            },
                            [
                              _c(
                                "circle",
                                { attrs: { cx: "15", cy: "15", r: "12.9998" } },
                                [
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "r",
                                      from: "15",
                                      to: "15",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "15;9;15",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "fill-opacity",
                                      from: "1",
                                      to: "1",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "1;.5;1",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "circle",
                                {
                                  attrs: {
                                    cx: "60",
                                    cy: "15",
                                    r: "11.0002",
                                    "fill-opacity": "0.3"
                                  }
                                },
                                [
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "r",
                                      from: "9",
                                      to: "9",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "9;15;9",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "fill-opacity",
                                      from: "0.5",
                                      to: "0.5",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: ".5;1;.5",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "circle",
                                {
                                  attrs: { cx: "105", cy: "15", r: "12.9998" }
                                },
                                [
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "r",
                                      from: "15",
                                      to: "15",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "15;9;15",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "fill-opacity",
                                      from: "1",
                                      to: "1",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "1;.5;1",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  },
                  proxy: true
                }
              ],
              null,
              false,
              1125213236
            )
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.attachModalState
        ? _c("v-modal", {
            attrs: {
              label: _vm.$t("associate"),
              "card-classes": "attach-modal"
            },
            on: {
              close: function($event) {
                _vm.attachModalState = false
              }
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "body",
                  fn: function() {
                    return [
                      _c(
                        _vm.resource.field.components.creating,
                        _vm._b(
                          {
                            tag: "component",
                            attrs: {
                              field: _vm.resource.field,
                              "form-data": {},
                              multiple: false
                            },
                            model: {
                              value: _vm.itemToAttach,
                              callback: function($$v) {
                                _vm.itemToAttach = $$v
                              },
                              expression: "itemToAttach"
                            }
                          },
                          "component",
                          _vm.resource.field.attributes,
                          false
                        )
                      )
                    ]
                  },
                  proxy: true
                },
                {
                  key: "footer",
                  fn: function() {
                    return [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-normal btn-text",
                          on: {
                            click: function($event) {
                              _vm.attachModalState = false
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.$t("dashboard.cancel")))]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-normal btn-primary btn-radius",
                          attrs: { disabled: !_vm.itemToAttach },
                          on: { click: _vm.attachItem }
                        },
                        [
                          _c(
                            "span",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: !_vm.attaching,
                                  expression: "!attaching"
                                }
                              ]
                            },
                            [_vm._v(_vm._s(_vm.$t("dashboard.attach")))]
                          ),
                          _vm._v(" "),
                          _c(
                            "svg",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.attaching,
                                  expression: "attaching"
                                }
                              ],
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "24px",
                                height: "24px",
                                viewBox: "0 0 120 30",
                                fill: "#fff"
                              }
                            },
                            [
                              _c(
                                "circle",
                                { attrs: { cx: "15", cy: "15", r: "12.9998" } },
                                [
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "r",
                                      from: "15",
                                      to: "15",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "15;9;15",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "fill-opacity",
                                      from: "1",
                                      to: "1",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "1;.5;1",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "circle",
                                {
                                  attrs: {
                                    cx: "60",
                                    cy: "15",
                                    r: "11.0002",
                                    "fill-opacity": "0.3"
                                  }
                                },
                                [
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "r",
                                      from: "9",
                                      to: "9",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "9;15;9",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "fill-opacity",
                                      from: "0.5",
                                      to: "0.5",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: ".5;1;.5",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "circle",
                                {
                                  attrs: { cx: "105", cy: "15", r: "12.9998" }
                                },
                                [
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "r",
                                      from: "15",
                                      to: "15",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "15;9;15",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("animate", {
                                    attrs: {
                                      attributeName: "fill-opacity",
                                      from: "1",
                                      to: "1",
                                      begin: "0s",
                                      dur: "0.8s",
                                      values: "1;.5;1",
                                      calcMode: "linear",
                                      repeatCount: "indefinite"
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        ]
                      )
                    ]
                  },
                  proxy: true
                }
              ],
              null,
              false,
              1601820478
            )
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/components/VPagination.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/VPagination.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VPagination_vue_vue_type_template_id_228c9b95___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VPagination.vue?vue&type=template&id=228c9b95& */ "./resources/js/components/VPagination.vue?vue&type=template&id=228c9b95&");
/* harmony import */ var _VPagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VPagination.vue?vue&type=script&lang=js& */ "./resources/js/components/VPagination.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VPagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VPagination_vue_vue_type_template_id_228c9b95___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VPagination_vue_vue_type_template_id_228c9b95___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/VPagination.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/VPagination.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/VPagination.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VPagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./VPagination.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VPagination.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VPagination_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/VPagination.vue?vue&type=template&id=228c9b95&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/VPagination.vue?vue&type=template&id=228c9b95& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VPagination_vue_vue_type_template_id_228c9b95___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./VPagination.vue?vue&type=template&id=228c9b95& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/VPagination.vue?vue&type=template&id=228c9b95&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VPagination_vue_vue_type_template_id_228c9b95___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VPagination_vue_vue_type_template_id_228c9b95___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/additional-actions.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/additional-actions.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _additional_actions_vue_vue_type_template_id_cabc713c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./additional-actions.vue?vue&type=template&id=cabc713c&scoped=true& */ "./resources/js/components/additional-actions.vue?vue&type=template&id=cabc713c&scoped=true&");
/* harmony import */ var _additional_actions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./additional-actions.vue?vue&type=script&lang=js& */ "./resources/js/components/additional-actions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _additional_actions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _additional_actions_vue_vue_type_template_id_cabc713c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _additional_actions_vue_vue_type_template_id_cabc713c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "cabc713c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/additional-actions.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/additional-actions.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/additional-actions.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_additional_actions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./additional-actions.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/additional-actions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_additional_actions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/additional-actions.vue?vue&type=template&id=cabc713c&scoped=true&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/components/additional-actions.vue?vue&type=template&id=cabc713c&scoped=true& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_additional_actions_vue_vue_type_template_id_cabc713c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./additional-actions.vue?vue&type=template&id=cabc713c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/additional-actions.vue?vue&type=template&id=cabc713c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_additional_actions_vue_vue_type_template_id_cabc713c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_additional_actions_vue_vue_type_template_id_cabc713c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/filters/filter-wrapper.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/filters/filter-wrapper.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filter_wrapper_vue_vue_type_template_id_430e96dd_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter-wrapper.vue?vue&type=template&id=430e96dd&scoped=true& */ "./resources/js/components/filters/filter-wrapper.vue?vue&type=template&id=430e96dd&scoped=true&");
/* harmony import */ var _filter_wrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filter-wrapper.vue?vue&type=script&lang=js& */ "./resources/js/components/filters/filter-wrapper.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _filter_wrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _filter_wrapper_vue_vue_type_template_id_430e96dd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _filter_wrapper_vue_vue_type_template_id_430e96dd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "430e96dd",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/filters/filter-wrapper.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/filters/filter-wrapper.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/filters/filter-wrapper.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_wrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./filter-wrapper.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/filters/filter-wrapper.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_wrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/filters/filter-wrapper.vue?vue&type=template&id=430e96dd&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/filters/filter-wrapper.vue?vue&type=template&id=430e96dd&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_wrapper_vue_vue_type_template_id_430e96dd_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./filter-wrapper.vue?vue&type=template&id=430e96dd&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/filters/filter-wrapper.vue?vue&type=template&id=430e96dd&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_wrapper_vue_vue_type_template_id_430e96dd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_wrapper_vue_vue_type_template_id_430e96dd_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/filters/hubble-filter.vue":
/*!***********************************************************!*\
  !*** ./resources/js/components/filters/hubble-filter.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hubble_filter_vue_vue_type_template_id_3869c910_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hubble-filter.vue?vue&type=template&id=3869c910&scoped=true& */ "./resources/js/components/filters/hubble-filter.vue?vue&type=template&id=3869c910&scoped=true&");
/* harmony import */ var _hubble_filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hubble-filter.vue?vue&type=script&lang=js& */ "./resources/js/components/filters/hubble-filter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _hubble_filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _hubble_filter_vue_vue_type_template_id_3869c910_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _hubble_filter_vue_vue_type_template_id_3869c910_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3869c910",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/filters/hubble-filter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/filters/hubble-filter.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/components/filters/hubble-filter.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./hubble-filter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/filters/hubble-filter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/filters/hubble-filter.vue?vue&type=template&id=3869c910&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/components/filters/hubble-filter.vue?vue&type=template&id=3869c910&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_filter_vue_vue_type_template_id_3869c910_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./hubble-filter.vue?vue&type=template&id=3869c910&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/filters/hubble-filter.vue?vue&type=template&id=3869c910&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_filter_vue_vue_type_template_id_3869c910_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_filter_vue_vue_type_template_id_3869c910_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/v-modal.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/v-modal.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v_modal_vue_vue_type_template_id_f088b5ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v-modal.vue?vue&type=template&id=f088b5ca& */ "./resources/js/components/v-modal.vue?vue&type=template&id=f088b5ca&");
/* harmony import */ var _v_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v-modal.vue?vue&type=script&lang=js& */ "./resources/js/components/v-modal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _v_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _v_modal_vue_vue_type_template_id_f088b5ca___WEBPACK_IMPORTED_MODULE_0__["render"],
  _v_modal_vue_vue_type_template_id_f088b5ca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/v-modal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/v-modal.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/v-modal.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_v_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./v-modal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/v-modal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_v_modal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/v-modal.vue?vue&type=template&id=f088b5ca&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/v-modal.vue?vue&type=template&id=f088b5ca& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_v_modal_vue_vue_type_template_id_f088b5ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./v-modal.vue?vue&type=template&id=f088b5ca& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/v-modal.vue?vue&type=template&id=f088b5ca&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_v_modal_vue_vue_type_template_id_f088b5ca___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_v_modal_vue_vue_type_template_id_f088b5ca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/hubble-index.vue":
/*!***************************************!*\
  !*** ./resources/js/hubble-index.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hubble_index_vue_vue_type_template_id_466b5aee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hubble-index.vue?vue&type=template&id=466b5aee& */ "./resources/js/hubble-index.vue?vue&type=template&id=466b5aee&");
/* harmony import */ var _hubble_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hubble-index.vue?vue&type=script&lang=js& */ "./resources/js/hubble-index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _hubble_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _hubble_index_vue_vue_type_template_id_466b5aee___WEBPACK_IMPORTED_MODULE_0__["render"],
  _hubble_index_vue_vue_type_template_id_466b5aee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/hubble-index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/hubble-index.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./resources/js/hubble-index.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--4-0!../../node_modules/vue-loader/lib??vue-loader-options!./hubble-index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/hubble-index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/hubble-index.vue?vue&type=template&id=466b5aee&":
/*!**********************************************************************!*\
  !*** ./resources/js/hubble-index.vue?vue&type=template&id=466b5aee& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_index_vue_vue_type_template_id_466b5aee___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./hubble-index.vue?vue&type=template&id=466b5aee& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/hubble-index.vue?vue&type=template&id=466b5aee&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_index_vue_vue_type_template_id_466b5aee___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_index_vue_vue_type_template_id_466b5aee___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/utils.js":
/*!*******************************!*\
  !*** ./resources/js/utils.js ***!
  \*******************************/
/*! exports provided: buildFormData, smart_substr, encodeUrl, arrayToFileList, mergeFiles, mergeFileLists, diffFiles, removeFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildFormData", function() { return buildFormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smart_substr", function() { return smart_substr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeUrl", function() { return encodeUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToFileList", function() { return arrayToFileList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeFiles", function() { return mergeFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeFileLists", function() { return mergeFileLists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "diffFiles", function() { return diffFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFile", function() { return removeFile; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var buildFormData = function buildFormData(data) {
  var formData = new FormData();

  var appendData = function appendData(items) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    Object.keys(items).forEach(function (key) {
      var datum = items[key];
      if (datum === null) return formData;

      if (Array.isArray(datum)) {
        datum.forEach(function (elem, k) {
          if (prefix) appendData(elem, "".concat(prefix, "[").concat(key, "][").concat(k, "]"));else appendData(elem, "".concat(key, "[").concat(k, "]"));
        });
      } else if (_typeof(datum) === 'object') {
        appendData(datum, key);
      } else {
        if (prefix) formData.append("".concat(prefix, "[").concat(key, "]"), datum);else formData.append("".concat(key), datum);
      }
    });
  };

  appendData(data);
  return formData;
};
var smart_substr = function smart_substr(str, len) {
  var temp = str.substr(0, len);
  if (str.length > len) temp += '...';

  if (temp.lastIndexOf('<') > temp.lastIndexOf('>')) {
    temp = str.substr(0, 1 + str.indexOf('>', temp.lastIndexOf('<')));
    if (str.length > len) temp += '...';
  }

  return temp;
};
var encodeUrl = function encodeUrl(params) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var queries = [];
  Object.keys(params).forEach(function (key) {
    var param = params[key];
    if (param === null) return;

    if (Array.isArray(param)) {
      param.forEach(function (p, k) {
        var value = encodeURIComponent(p);

        if (Array.isArray(p) || _typeof(p) === 'object') {
          if (prefix) {
            queries.push("".concat(encodeUrl(p, "".concat(prefix, "[").concat(key, "][").concat(k, "]"))));
          } else {
            queries.push("".concat(encodeUrl(p, "".concat(key, "[").concat(k, "]"))));
          }
        } else {
          if (prefix) {
            queries.push("".concat(prefix, "[").concat(key, "][").concat(k, "]=").concat(value));
          } else {
            queries.push("".concat(key, "[").concat(k, "]=").concat(value));
          }
        }
      });
    } else if (_typeof(param) === 'object') {
      queries.push(encodeUrl(param, key));
    } else {
      if (prefix) {
        queries.push("".concat(prefix, "[").concat(key, "]=").concat(encodeURIComponent(param)));
      } else {
        queries.push("".concat(key, "=").concat(encodeURIComponent(param)));
      }
    }
  });
  return queries.filter(function (val) {
    return !!val;
  }).join("&");
};
function arrayToFileList(files) {
  var data = new ClipboardEvent('').clipboardData || new DataTransfer();
  files.forEach(function (file) {
    return data.items.add(file);
  });
  return data.files;
}
function mergeFiles(files1, files2) {
  var files = _toConsumableArray(files1);

  files2.forEach(function (file) {
    if (files.find(function (f) {
      return f.size === file.size && f.name === file.name;
    }) === undefined) {
      files.push(file);
    }
  });
  return files;
}
function mergeFileLists(files1, files2) {
  return arrayToFileList(mergeFiles(Array.from(files1), Array.from(files2)));
}
function diffFiles(oldFiles, newFiles) {
  if (oldFiles === null) {
    return [Array.from(newFiles), []];
  }

  var added = Array.from(newFiles).filter(function (f) {
    return !Array.from(oldFiles).includes(f);
  });
  var removed = Array.from(oldFiles).filter(function (f) {
    return !Array.from(newFiles).includes(f);
  });
  return [added, removed];
}
function removeFile(fileList, file) {
  return arrayToFileList(Array.from(fileList).filter(function (f) {
    return f !== file;
  }));
}

/***/ })

}]);