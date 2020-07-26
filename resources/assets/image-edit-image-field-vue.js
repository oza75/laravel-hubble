(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["image-edit-image-field-vue"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/FileInput.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/image/FileInput.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "file-input",
  data: function data() {
    return {
      filename: '',
      formData: []
    };
  },
  props: {
    value: {
      type: [Array, String]
    },
    accept: {
      type: String,
      "default": '*'
    },
    name: {
      required: true,
      type: String
    },
    label: {
      type: String,
      "default": 'choose_file'
    },
    required: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    multiple: {
      type: Boolean,
      "default": false
    },
    type: {
      type: String,
      "default": ''
    },
    max: {
      type: Number,
      "default": null
    }
  },
  methods: {
    onFocus: function onFocus() {
      this.$emit('focus'); // @ts-ignore

      this.$refs.fileInput.value = '';

      if (!this.disabled) {
        // @ts-ignore
        this.$refs.fileInput.click();
      }
    },
    onFileChange: function onFileChange($event) {
      var files = $event.target.files || $event.dataTransfer.files;
      this.$emit('upload', files, this.type);
    }
  },
  mounted: function mounted() {
    this.filename = this.value;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/edit-image-field.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/image/edit-image-field.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FileInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileInput */ "./resources/js/components/fields/image/FileInput.vue");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils */ "./resources/js/utils.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "edit-image-field",
  data: function data() {
    return {
      previews: [],
      images: [],
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
  components: {
    FileInput: _FileInput__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  computed: {
    files: function files() {
      return this.formData[this.field.name + '_files'] || [];
    },
    canAdd: function canAdd() {
      if (!this.multiple) return this.previews.length < 1;
      if (!this.max) return true;
      return this.previews.length < this.max;
    }
  },
  methods: {
    remove: function remove(file) {
      var files = Object.assign([], this.files);
      var index = files.findIndex(function (it) {
        return it.name === file.name;
      });

      if (index !== -1) {
        this.removed.push(file);
      }

      var pIndex = this.previews.findIndex(function (it) {
        return it.name === file.name;
      });
      if (pIndex !== -1) this.previews.splice(pIndex, 1);
      var iIndex = this.images.findIndex(function (it) {
        return it.name === file.name;
      });
      if (iIndex !== -1) this.images.splice(iIndex, 1);
    },

    /**
     * @param {FileList} files
     */
    upload: function upload(files) {
      var _this = this;

      var _iterator = _createForOfIteratorHelper(files),
          _step;

      try {
        var _loop = function _loop() {
          var file = _step.value;

          var index = _this.previews.findIndex(function (it) {
            return it.name === file.name;
          });

          if (index !== -1 || !_this.canAdd) return "continue";
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            _this.previews.push({
              url: reader.result,
              name: file.name
            });
          });
          reader.readAsDataURL(file);
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop();

          if (_ret === "continue") continue;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var aFiles = Array.from(files);
      var toAdd = aFiles;
      if (!this.canAdd) toAdd = [];else if (!this.max) toAdd = aFiles;else {
        toAdd = aFiles.slice(0, this.max - this.images.length);
      }
      this.images = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["mergeFiles"])(this.images, toAdd);
    }
  },
  watch: {
    images: function images(_images) {
      this.$refs['fileInput'].files = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["arrayToFileList"])(_images);
      this.$emit('input', _images);
    },
    previews: function previews(_previews) {
      this.$set(this.formData, this.field.name + '_files', _previews);
    }
  },
  created: function created() {
    this.previews = Object.assign([], this.files);
    this.oldFiles = Object.assign([], this.files);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/image/FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ninput[type=file][data-v-d3b6aae2] {\n    position: absolute;\n    left: -99999px;\n}\n.input-main-card[data-v-d3b6aae2] {\n    background-color: #34495e;\n    color: white;\n    cursor: pointer;\n    transition: background-color 0.3s;\n}\n.input-main-card[data-v-d3b6aae2]:hover {\n    background-color: #1abc9c;\n}\n.remove-btn[data-v-d3b6aae2] {\n    position: absolute;\n    left: -40px;\n    top: -40px;\n    color: white;\n    transform: translateX(20px) translateY(20px);\n    transition: all 0.3s;\n}\n.remove-btn[data-v-d3b6aae2]:hover {\n    width: 112px !important;\n    height: 112px !important;\n    left: -80px;\n    top: -80px;\n    transform: translateX(40px) translateY(40px);\n}\n.round[data-v-d3b6aae2] {\n    border-radius: 50%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/image/FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/FileInput.vue?vue&type=template&id=d3b6aae2&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/image/FileInput.vue?vue&type=template&id=d3b6aae2&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "inline-block file-input--container" }, [
    _c(
      "div",
      { on: { click: _vm.onFocus } },
      [
        _vm._t("activator", [
          _c("label", { attrs: { for: "file-input" } }, [
            _vm._v(_vm._s(_vm.label.toUpperCase()))
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.filename,
                expression: "filename"
              }
            ],
            ref: "fileTextField",
            attrs: {
              type: "text",
              id: "file-input",
              disabled: _vm.disabled,
              required: _vm.required
            },
            domProps: { value: _vm.filename },
            on: {
              click: function($event) {
                if ($event.target !== $event.currentTarget) {
                  return null
                }
                return _vm.onFocus($event)
              },
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.filename = $event.target.value
              }
            }
          })
        ])
      ],
      2
    ),
    _vm._v(" "),
    _c("input", {
      ref: "fileInput",
      attrs: {
        type: "file",
        name: _vm.name,
        accept: _vm.accept,
        multiple: _vm.multiple,
        disabled: _vm.disabled
      },
      on: { change: _vm.onFileChange }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/edit-image-field.vue?vue&type=template&id=78722158&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/fields/image/edit-image-field.vue?vue&type=template&id=78722158&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "edit-image-field" },
    [
      _c(
        "ul",
        { staticClass: "current-files" },
        _vm._l(_vm.previews, function(file) {
          return _c("li", { key: file.name, staticClass: "file" }, [
            _c(
              "div",
              {
                staticClass: "add-card",
                style: "background-image: url(" + file.url + ")"
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "remove-btn",
                    on: {
                      click: function($event) {
                        return _vm.remove(file)
                      }
                    }
                  },
                  [
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
                  ]
                )
              ]
            )
          ])
        }),
        0
      ),
      _vm._v(" "),
      _vm.canAdd
        ? _c("file-input", {
            attrs: {
              id: _vm.field.name,
              name: "__fake__" + _vm.field.name,
              multiple: _vm.multiple
            },
            on: { upload: _vm.upload },
            scopedSlots: _vm._u(
              [
                {
                  key: "activator",
                  fn: function() {
                    return [
                      _c("div", { staticClass: "add-card" }, [
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
                            }
                          },
                          [_c("path", { attrs: { d: "M12 4v16m8-8H4" } })]
                        )
                      ])
                    ]
                  },
                  proxy: true
                }
              ],
              null,
              false,
              3984178342
            )
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "input",
        _vm._b(
          {
            ref: "fileInput",
            staticStyle: { display: "none" },
            attrs: {
              type: "file",
              id: _vm.field.name,
              name: _vm.multiple ? _vm.field.name + "[]" : _vm.field.name,
              multiple: _vm.multiple
            }
          },
          "input",
          _vm.$attrs,
          false
        )
      ),
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

/***/ "./resources/js/components/fields/image/FileInput.vue":
/*!************************************************************!*\
  !*** ./resources/js/components/fields/image/FileInput.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FileInput_vue_vue_type_template_id_d3b6aae2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileInput.vue?vue&type=template&id=d3b6aae2&scoped=true& */ "./resources/js/components/fields/image/FileInput.vue?vue&type=template&id=d3b6aae2&scoped=true&");
/* harmony import */ var _FileInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FileInput.vue?vue&type=script&lang=js& */ "./resources/js/components/fields/image/FileInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _FileInput_vue_vue_type_style_index_0_id_d3b6aae2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css& */ "./resources/js/components/fields/image/FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _FileInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FileInput_vue_vue_type_template_id_d3b6aae2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FileInput_vue_vue_type_template_id_d3b6aae2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "d3b6aae2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/fields/image/FileInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/fields/image/FileInput.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/fields/image/FileInput.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FileInput.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/FileInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/fields/image/FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/js/components/fields/image/FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_style_index_0_id_d3b6aae2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/FileInput.vue?vue&type=style&index=0&id=d3b6aae2&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_style_index_0_id_d3b6aae2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_style_index_0_id_d3b6aae2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_style_index_0_id_d3b6aae2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_style_index_0_id_d3b6aae2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_style_index_0_id_d3b6aae2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/fields/image/FileInput.vue?vue&type=template&id=d3b6aae2&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/components/fields/image/FileInput.vue?vue&type=template&id=d3b6aae2&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_template_id_d3b6aae2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./FileInput.vue?vue&type=template&id=d3b6aae2&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/FileInput.vue?vue&type=template&id=d3b6aae2&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_template_id_d3b6aae2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FileInput_vue_vue_type_template_id_d3b6aae2_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/components/fields/image/edit-image-field.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/components/fields/image/edit-image-field.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit_image_field_vue_vue_type_template_id_78722158_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit-image-field.vue?vue&type=template&id=78722158&scoped=true& */ "./resources/js/components/fields/image/edit-image-field.vue?vue&type=template&id=78722158&scoped=true&");
/* harmony import */ var _edit_image_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-image-field.vue?vue&type=script&lang=js& */ "./resources/js/components/fields/image/edit-image-field.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _edit_image_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _edit_image_field_vue_vue_type_template_id_78722158_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _edit_image_field_vue_vue_type_template_id_78722158_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "78722158",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/fields/image/edit-image-field.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/fields/image/edit-image-field.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/fields/image/edit-image-field.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_image_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./edit-image-field.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/edit-image-field.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_image_field_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/fields/image/edit-image-field.vue?vue&type=template&id=78722158&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/components/fields/image/edit-image-field.vue?vue&type=template&id=78722158&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_image_field_vue_vue_type_template_id_78722158_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./edit-image-field.vue?vue&type=template&id=78722158&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/fields/image/edit-image-field.vue?vue&type=template&id=78722158&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_image_field_vue_vue_type_template_id_78722158_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_edit_image_field_vue_vue_type_template_id_78722158_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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