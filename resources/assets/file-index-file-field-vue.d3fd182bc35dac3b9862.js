(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{36:function(e,l,t){"use strict";t.r(l);var a={name:"index-file-field",props:{field:{type:Object,required:!0},value:{default:null}},methods:{limit:function(e){var l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50,t=e.split("."),a=t.pop(),i=t.join(".");return i.length>l&&(i=i.substr(0,l)+"..."),console.log(i+"."+a),i+"."+a}}},i=t(0),n=Object(i.a)(a,(function(){var e,l=this,t=l.$createElement,a=l._self._c||t;return a("div",{class:(e={},e["show--file--wrapper"]=!0,e)},[l.value&&0!==l.value.length?1===l.value.length?a("div",[a("a",{staticClass:"default--color",attrs:{href:l.value[0].url,target:"_blank"}},[l._v(l._s(l.limit(l.value[0].name,10)))])]):a("div",[l._v(l._s(l.value.length)+" Fichiers")]):a("div",[l._v("N/A")])])}),[],!1,null,"b71e5bd4",null);l.default=n.exports}}]);