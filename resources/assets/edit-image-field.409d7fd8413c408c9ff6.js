(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(t,e,n){"use strict";function r(t){return function(t){if(Array.isArray(t))return i(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}n.d(e,"a",(function(){return a}));var a={data:function(){return{allErrors:{},timers:{}}},props:{field:{type:Object,required:!0},formData:{type:Object,default:function(){return{}}},item:{type:Object,default:function(){return{}}},value:{default:null},type:{type:String,default:"text"}},computed:{errors:function(){return Object.values(this.allErrors)},hasErrors:function(){return this.errors.length>0},rules:function(){return this.field.rules||[]},rulesAttrs:function(){var t=this,e={},n=this.rules;return Object.keys(n).forEach((function(r){var i=n[r],o=t.htmlRules[r];o&&(e[o]=i[0]||!0)})),e},htmlRules:function(){return{required:"required",min:"minlength",max:"maxlength"}}},methods:{input:function(t){this.$emit("input",t)},extractRuleMessage:function(t,e){var n=this;"string"==typeof e?this.$set(this.allErrors,t,e):"boolean"!=typeof e||e?e instanceof Promise?e.then((function(e){n.extractRuleMessage(t,e)})):"object"===o(e)?Object.keys(e).forEach((function(r){e[r].forEach((function(e){n.$set(n.allErrors,t,e)}))})):this.$delete(this.allErrors,t):this.$set(this.allErrors,t,this.$t("validation.".concat(t),{attribute:this.field.name}))},validate:function(t,e,n,i){var o,a;t?o=t.apply(void 0,[e,this.field.name].concat(r(i))):o=(a=window.hubble_rules).defaultHandler.apply(a,[e,this.field.name,n].concat(r(i)));this.extractRuleMessage(n,o)}},watch:{value:function(t){var e=this,n=Object.keys(this.rules);n.includes("nullable")&&window.hubble_rules.nullable(t,this.field.name)||t===this.item[this.field.name]?this.allErrors=[]:(this.$delete(this.allErrors,"any"),n.filter((function(t){return!["nullable"].includes(t)})).forEach((function(n){var r=e.rules[n],i=window.hubble_rules[n];["unique"].includes(n)||!i?(clearTimeout(e.timers[n]),e.timers[n]=setTimeout((function(){e.validate(i,t,n,r)}),250)):e.validate(i,t,n,r)})))}},created:function(){var t=this.$formErrors(this.field.name),e=this.$old(this.field.name,!1);e&&this.input(e),t&&t.length>0&&this.$set(this.allErrors,"any",t[0])}}},26:function(t,e,n){"use strict";n.r(e);var r=n(3);function i(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return u=t.done,t},e:function(t){s=!0,a=t},f:function(){try{u||null==n.return||n.return()}finally{if(s)throw a}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var a={name:"edit-image-field",data:function(){return{previews:[],images:[],removed:[],oldFiles:[]}},mixins:[n(1).a],props:{multiple:{type:Boolean,default:!1},max:{type:Number,default:null}},computed:{files:function(){return this.formData[this.field.name+"_files"]||[]},accept:function(){return this.field.attributes.accept||"image/*"},canAdd:function(){return this.multiple?!this.max||this.previews.length<this.max:this.previews.length<1}},methods:{remove:function(t){-1!==Object.assign([],this.files).findIndex((function(e){return e.name===t.name}))&&this.removed.push(t);var e=this.previews.findIndex((function(e){return e.name===t.name}));-1!==e&&this.previews.splice(e,1);var n=this.images.findIndex((function(e){return e.name===t.name}));-1!==n&&this.images.splice(n,1)},upload:function(t){var e,n=this,o=i(t);try{var a=function(){var t=e.value;if(-1!==n.previews.findIndex((function(e){return e.name===t.name}))||!n.canAdd)return"continue";var r=new FileReader;r.addEventListener("load",(function(){n.previews.push({url:r.result,name:t.name})})),r.readAsDataURL(t)};for(o.s();!(e=o.n()).done;)a()}catch(t){o.e(t)}finally{o.f()}var u=Array.from(t),s=u;s=this.canAdd?this.max?u.slice(0,this.max-this.images.length):u:[],this.images=Object(r.c)(this.images,s)}},watch:{images:function(t){this.$refs.fileInput.files=Object(r.a)(t),this.input(t)},previews:function(t){this.$set(this.formData,this.field.name+"_files",t)}},created:function(){this.previews=Object.assign([],this.files),this.oldFiles=Object.assign([],this.files)}},u=n(0),s=Object(u.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"edit-image-field"},[n("ul",{staticClass:"current-files"},t._l(t.previews,(function(e){return n("li",{key:e.name,staticClass:"file"},[n("div",{staticClass:"add-card",style:"background-image: url("+e.url+")"},[n("div",{staticClass:"remove-btn",on:{click:function(n){return t.remove(e)}}},[n("svg",{attrs:{fill:"none","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"}})])])])])})),0),t._v(" "),t.canAdd?n("file-input",{attrs:{id:t.field.name,accept:t.accept,name:"__fake__"+t.field.name,multiple:t.multiple},on:{upload:t.upload},scopedSlots:t._u([{key:"activator",fn:function(){return[n("div",{staticClass:"add-card"},[n("svg",{attrs:{fill:"none","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{d:"M12 4v16m8-8H4"}})])])]},proxy:!0}],null,!1,3984178342)}):t._e(),t._v(" "),n("input",t._b({ref:"fileInput",class:{error:t.hasErrors},staticStyle:{display:"none"},attrs:{type:"file",id:t.field.name,name:t.multiple?t.field.name+"[]":t.field.name,multiple:t.multiple}},"input",t.$attrs,!1)),t._v(" "),t._l(t.removed,(function(e){return n("input",{key:"remove-"+e.name,attrs:{type:"hidden",name:t.field.name+"__removed__[]"},domProps:{value:e.name}})})),t._v(" "),t._l(t.oldFiles,(function(e){return n("input",{key:"current-"+e.name,attrs:{type:"hidden",name:t.field.name+"__current__[]"},domProps:{value:e.name}})})),t._v(" "),n("input-errors",{attrs:{errors:t.errors}})],2)}),[],!1,null,"69a04e6f",null);e.default=s.exports},3:function(t,e,n){"use strict";function r(t){return function(t){if(Array.isArray(t))return i(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}n.d(e,"d",(function(){return a})),n.d(e,"b",(function(){return u})),n.d(e,"a",(function(){return s})),n.d(e,"c",(function(){return l}));var a=function(t,e){var n=t.substr(0,e);return t.length>e&&(n+="..."),n.lastIndexOf("<")>n.lastIndexOf(">")&&(n=t.substr(0,1+t.indexOf(">",n.lastIndexOf("<"))),t.length>e&&(n+="...")),n},u=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=[];return Object.keys(e).forEach((function(i){var a=e[i];null!==a&&(Array.isArray(a)?a.forEach((function(e,a){var u=encodeURIComponent(e);Array.isArray(e)||"object"===o(e)?n?r.push("".concat(t(e,"".concat(n,"[").concat(i,"][").concat(a,"]")))):r.push("".concat(t(e,"".concat(i,"[").concat(a,"]")))):n?r.push("".concat(n,"[").concat(i,"][").concat(a,"]=").concat(u)):r.push("".concat(i,"[").concat(a,"]=").concat(u))})):"object"===o(a)?r.push(t(a,i)):n?r.push("".concat(n,"[").concat(i,"]=").concat(encodeURIComponent(a))):r.push("".concat(i,"=").concat(encodeURIComponent(a))))})),r.filter((function(t){return!!t})).join("&")};function s(t){var e=new ClipboardEvent("").clipboardData||new DataTransfer;return t.forEach((function(t){return e.items.add(t)})),e.files}function l(t,e){var n=r(t);return e.forEach((function(t){void 0===n.find((function(e){return e.size===t.size&&e.name===t.name}))&&n.push(t)})),n}}}]);