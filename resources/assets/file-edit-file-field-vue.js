(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["file-edit-file-field-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/file/edit-file-field.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/file/edit-file-field.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "edit-file-field",
  data: function data() {
    return {
      removed: [],
      oldFiles: []
    };
  },
  props: {
    field: {
      type: Object,
      required: true
    },
    formData: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    value: {
      "default": null
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    max: {
      type: Number,
      "default": null
    }
  },
  computed: {
    files: function files() {
      return this.formData[this.field.name + '_files'] || [];
    },
    canAdd: function canAdd() {
      if (!this.multiple) return this.previews.length < 1;
      if (!this.max) return true;
      return this.files.length < this.max;
    }
  },
  methods: {
    remove: function remove(file) {
      var files = Object.assign([], this.files);
      var index = files.findIndex(function (it) {
        return it.name === file.name;
      });
      if (index === -1) return;
      files.splice(index, 1);
      this.removed.push(file);
      this.$set(this.formData, this.field.name + '_files', files);
    }
  },
  created: function created() {
    this.oldFiles = Object.assign([], this.files);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/file/edit-file-field.vue?vue&type=template&id=457c34d8&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/file/edit-file-field.vue?vue&type=template&id=457c34d8&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "edit-file-field" },
    [
      _c(
        "ul",
        { staticClass: "current-files" },
        _vm._l(_vm.files, function(file) {
          return _c("li", { key: file.name, staticClass: "file" }, [
            _c("a", { attrs: { href: file.url, target: "_blank" } }, [
              _vm._v(_vm._s(file.name))
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                attrs: {
                  fill: "none",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor"
                },
                on: {
                  click: function($event) {
                    return _vm.remove(file)
                  }
                }
              },
              [
                _c("path", {
                  attrs: {
                    d:
                      "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  }
                })
              ]
            )
          ])
        }),
        0
      ),
      _vm._v(" "),
      _vm.canAdd
        ? _c(
            "input",
            _vm._b(
              {
                attrs: {
                  type: "file",
                  id: _vm.field.name,
                  name: _vm.multiple ? _vm.field.name + "[]" : _vm.field.name,
                  multiple: _vm.multiple,
                  maxlength: !_vm.max ? Infinity : _vm.max - _vm.files.length
                },
                on: {
                  input: function($event) {
                    return _vm.$emit("input", $event.target.value)
                  }
                }
              },
              "input",
              _vm.$attrs,
              false
            )
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.removed, function(file) {
        return _c("input", {
          key: "remove-" + file.name,
          attrs: { type: "hidden", name: _vm.field.name + "__removed__[]" },
          domProps: { value: file.name }
        })
      }),
      _vm._v(" "),
      _vm._l(_vm.oldFiles, function(file) {
        return _c("input", {
          key: "current-" + file.name,
          attrs: { type: "hidden", name: _vm.field.name + "__current__[]" },
          domProps: { value: file.name }
        })
      })
    ],
    2
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

/***/ "./resources/js/components/fields/file/edit-file-field.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/components/fields/file/edit-file-field.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit_file_field_vue_vue_type_template_id_457c34d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-file-field.vue?vue&type=template&id=457c34d8&scoped=true& */ "./resources/js/components/fields/file/edit-file-field.vue?vue&type=template&id=457c34d8&scoped=true&");
/* harmony import */ var _edit_file_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-file-field.vue?vue&type=script&lang=js& */ "./resources/js/components/fields/file/edit-file-field.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _edit_file_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _edit_file_field_vue_vue_type_template_id_457c34d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _edit_file_field_vue_vue_type_template_id_457c34d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "457c34d8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/fields/file/edit-file-field.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/fields/file/edit-file-field.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/components/fields/file/edit-file-field.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_file_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./edit-file-field.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/file/edit-file-field.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_file_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/fields/file/edit-file-field.vue?vue&type=template&id=457c34d8&scoped=true&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/fields/file/edit-file-field.vue?vue&type=template&id=457c34d8&scoped=true& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_file_field_vue_vue_type_template_id_457c34d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./edit-file-field.vue?vue&type=template&id=457c34d8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/file/edit-file-field.vue?vue&type=template&id=457c34d8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_file_field_vue_vue_type_template_id_457c34d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_file_field_vue_vue_type_template_id_457c34d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);