(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["hubble-details"],{

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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/hubble-details.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/hubble-details.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_v_modal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/v-modal.vue */ "./resources/js/components/v-modal.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "dashboard-details",
  data: function data() {
    return {
      openDeleteModal: false
    };
  },
  components: {
    VModal: _components_v_modal_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    resource: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    fields: function fields() {
      return Object.values(this.resource.fields);
    }
  },
  methods: {},
  created: function created() {}
});

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/hubble-details.vue?vue&type=template&id=493a5839&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/hubble-details.vue?vue&type=template&id=493a5839&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************/
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
    { staticClass: "container dashboard--container dashboard--details" },
    [
      _c("header", { staticClass: "header" }, [
        _c("h2", { staticClass: "title" }, [
          _vm._v(
            _vm._s(
              _vm.$t("dashboard.details_title", { name: _vm.resource.title })
            )
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "ctas" }, [
          _c(
            "a",
            {
              staticClass: "btn btn-normal btn-primary btn-radius",
              attrs: {
                href: _vm.item["@urls"]["edit"]["url"],
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
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-radius btn-white btn-normal",
              attrs: { title: _vm.$t("dashboard.delete") },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  _vm.openDeleteModal = true
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
        ])
      ]),
      _vm._v(" "),
      _c("section", { staticClass: "content--list" }, [
        _c(
          "ol",
          { staticClass: "table--list" },
          _vm._l(_vm.fields, function(field, k) {
            var _obj
            return _c(
              "li",
              {
                key: "field-" + k,
                staticClass: "table--list--row",
                class:
                  ((_obj = {}),
                  (_obj["field-" + field.name + "-row"] = true),
                  _obj)
              },
              [
                _c(
                  "label",
                  {
                    staticClass: "table--list--cell label--cell",
                    attrs: { for: field.name }
                  },
                  [_vm._v(_vm._s(field.title))]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "table--list--cell input--cell" },
                  [
                    _c(
                      field.components.details,
                      _vm._b(
                        {
                          tag: "component",
                          attrs: { field: field, value: _vm.item[field.name] }
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
          0
        )
      ]),
      _vm._v(" "),
      _vm.openDeleteModal
        ? _c("v-modal", {
            attrs: { label: _vm.$t("dashboard.confirmation") },
            on: {
              close: function($event) {
                _vm.openDeleteModal = false
              }
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "body",
                  fn: function() {
                    return [
                      _c("p", [
                        _vm._v(_vm._s(_vm.$t("dashboard.delete_item_message")))
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
                              _vm.openDeleteModal = false
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.$t("dashboard.cancel")))]
                      ),
                      _vm._v(" "),
                      _c(
                        "form",
                        {
                          attrs: {
                            action: _vm.item["@urls"]["show"]["url"],
                            method: "post"
                          }
                        },
                        [
                          _c("input", {
                            attrs: { type: "hidden", name: "_token" },
                            domProps: { value: _vm.resource.token }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            attrs: {
                              type: "hidden",
                              name: "_method",
                              value: "DELETE"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-normal btn-primary",
                              attrs: { type: "submit" }
                            },
                            [_vm._v(_vm._s(_vm.$t("dashboard.delete")))]
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
              1528599611
            )
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "related-resources--container" },
        _vm._l(_vm.resource.relatedResource, function(res, k) {
          return _c(
            "div",
            { key: "related-resource-" + k },
            [_c("hubble-index", { attrs: { resource: res } })],
            1
          )
        }),
        0
      )
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

/***/ "./resources/js/hubble-details.vue":
/*!*****************************************!*\
  !*** ./resources/js/hubble-details.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hubble_details_vue_vue_type_template_id_493a5839_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hubble-details.vue?vue&type=template&id=493a5839&scoped=true& */ "./resources/js/hubble-details.vue?vue&type=template&id=493a5839&scoped=true&");
/* harmony import */ var _hubble_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hubble-details.vue?vue&type=script&lang=js& */ "./resources/js/hubble-details.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _hubble_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _hubble_details_vue_vue_type_template_id_493a5839_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _hubble_details_vue_vue_type_template_id_493a5839_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "493a5839",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/hubble-details.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/hubble-details.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/hubble-details.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--4-0!../../node_modules/vue-loader/lib??vue-loader-options!./hubble-details.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/hubble-details.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_details_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/hubble-details.vue?vue&type=template&id=493a5839&scoped=true&":
/*!************************************************************************************!*\
  !*** ./resources/js/hubble-details.vue?vue&type=template&id=493a5839&scoped=true& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_details_vue_vue_type_template_id_493a5839_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./hubble-details.vue?vue&type=template&id=493a5839&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/hubble-details.vue?vue&type=template&id=493a5839&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_details_vue_vue_type_template_id_493a5839_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_hubble_details_vue_vue_type_template_id_493a5839_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);