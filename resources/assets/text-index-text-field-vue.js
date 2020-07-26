(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["text-index-text-field-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/text/index-text-field.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/text/index-text-field.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils */ "./resources/js/utils.js");
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "index-text-field",
  props: {
    field: {
      type: Object,
      required: true
    },
    value: {
      "default": null
    },
    type: {
      "default": 'text',
      type: String
    },
    limit: {
      "default": null
    }
  },
  computed: {
    text: function text() {
      if (!this.limit) return this.value;
      return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["smart_substr"])(this.value, this.limit);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/text/index-text-field.vue?vue&type=template&id=75b62168&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/text/index-text-field.vue?vue&type=template&id=75b62168&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    {
      class:
        ((_obj = {}), (_obj["show--" + _vm.type + "--wrapper"] = true), _obj)
    },
    [_c("div", { domProps: { innerHTML: _vm._s(_vm.text) } })]
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

/***/ "./resources/js/components/fields/text/index-text-field.vue":
/*!******************************************************************!*\
  !*** ./resources/js/components/fields/text/index-text-field.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_text_field_vue_vue_type_template_id_75b62168_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-text-field.vue?vue&type=template&id=75b62168&scoped=true& */ "./resources/js/components/fields/text/index-text-field.vue?vue&type=template&id=75b62168&scoped=true&");
/* harmony import */ var _index_text_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-text-field.vue?vue&type=script&lang=js& */ "./resources/js/components/fields/text/index-text-field.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_text_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_text_field_vue_vue_type_template_id_75b62168_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_text_field_vue_vue_type_template_id_75b62168_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "75b62168",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/fields/text/index-text-field.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/fields/text/index-text-field.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/fields/text/index-text-field.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_text_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index-text-field.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/text/index-text-field.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_text_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/fields/text/index-text-field.vue?vue&type=template&id=75b62168&scoped=true&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/fields/text/index-text-field.vue?vue&type=template&id=75b62168&scoped=true& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_text_field_vue_vue_type_template_id_75b62168_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index-text-field.vue?vue&type=template&id=75b62168&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/text/index-text-field.vue?vue&type=template&id=75b62168&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_text_field_vue_vue_type_template_id_75b62168_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_text_field_vue_vue_type_template_id_75b62168_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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