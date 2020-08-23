(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{72:function(e,t,i){"use strict";i.r(t);var s={name:"checkbox-filter-item",props:{valueKey:{type:String,required:!0},textKey:{type:String,required:!0},item:{required:!0,type:Object},isActive:{default:!1,type:Boolean},isNested:{default:!1,type:Boolean}},methods:{input:function(){this.$emit(this.isNested?"select":"input",this.item)}}},l=i(0),n={name:"hubble-checkbox-filter",data:function(){return{selectedStack:[],searchTimer:null}},components:{CheckboxFilterItem:Object(l.a)(s,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"checkbox--filter--item",on:{click:e.input}},[e._t("display",[i("span",[e._v(e._s(e.item[e.textKey]))])],null,{item:e.item}),e._v(" "),e.isNested?i("svg",{attrs:{width:"30",height:"30",viewBox:"0 0 30 30",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{d:"M10.7373 20.7375L16.4623 15L10.7373 9.2625L12.4998 7.5L19.9998 15L12.4998 22.5L10.7373 20.7375Z",fill:"currentColor"}})]):e._e(),e._v(" "),e.isNested?e._e():i("span",{staticClass:"fake-checkbox",class:{selected:e.isActive}})],2)}),[],!1,null,"4f327e24",null).exports},props:{multiple:{type:Boolean,default:!1},options:{type:Array,required:!0},name:{type:String,required:!0},valueKey:{type:String,required:!0},textKey:{type:String,required:!0},searchable:{type:Boolean,default:!1},searchPlaceholder:{type:String,default:"Rechercher ..."},childrenKey:{required:!1,type:String},returnObject:{default:!0,type:Boolean},inputMoreSpecificValue:{default:!1,type:Boolean},value:{default:void 0}},computed:{selected:function(){return this.selectedStack.length?this.selectedStack[this.selectedStack.length-1]:null},children:function(){return this.selected&&this.selected[this.childrenKey]||[]}},methods:{back:function(){this.selectedStack.pop()},select:function(e){var t=this,i=this.selectedStack.findIndex((function(i){return i[t.valueKey]===e[t.valueKey]}));-1===i?this.selectedStack.push(e):this.selectedStack.splice(i,1)},input:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],s=e;if(this.multiple)if(i)s=[e];else{var l=Array.isArray(this.value)?Object.assign([],this.value):[],n=l.findIndex((function(i){return i[t.valueKey]===e[t.valueKey]}));if(-1===n?l.push(e):l.splice(n,1),s=l,this.inputMoreSpecificValue){var a=this.selectedStack.map((function(e){return e[t.valueKey]}));s=s.filter((function(e){return!a.includes(e[t.valueKey])}))}}else this.returnObject&&this.value&&this.value[this.valueKey]===e[this.valueKey]?s=null:this.returnObject||this.value!==e[this.valueKey]||(s=null);this.$emit("input",s)},isActive:function(e){var t=this;if(this.value)return-1!==(this.multiple?this.value:[this.value]).findIndex((function(i){return i[t.valueKey]===e[t.valueKey]}))},isNested:function(e){return!!this.childrenKey&&(e[this.childrenKey]&&e[this.childrenKey].length>0)},search:function(e){var t=this;clearTimeout(this.searchTimer),this.searchTimer=setTimeout((function(){var i=e.target.value;t.$emit("search",i)}),300)}}},a=Object(l.a)(n,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"checkbox--filter"},[e.searchable?i("div",{staticClass:"checkbox--filter--search--wrapper"},[i("input",{staticClass:"checkbox--filter--search--input",attrs:{type:"text",placeholder:e.searchPlaceholder},on:{input:e.search}})]):e._e(),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0===e.children.length,expression:"children.length === 0"}]},[i("div",{staticClass:"checkbox--items"},e._l(e.options,(function(t,s){return i("checkbox-filter-item",{key:s,attrs:{item:t,"is-active":e.isActive(t),"is-nested":e.isNested(t),"value-key":e.valueKey,"text-key":e.textKey},on:{select:e.select,input:e.input},scopedSlots:e._u([{key:"display",fn:function(t){var s=t.item;return[e._t("display",[i("span",[e._v(e._s(s[e.textKey]))])],null,{item:s})]}}],null,!0)})})),1)]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.children.length,expression:"children.length"}]},[e.selected?i("div",{staticClass:"checkbox--filter--header"},[i("button",{staticClass:"black--btn",attrs:{type:"button"},on:{click:function(t){return t.stopPropagation(),e.back(t)}}},[i("svg",{attrs:{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{d:"M20.9999 11H6.41394L11.7069 5.70703L10.2929 4.29303L2.58594 12L10.2929 19.707L11.7069 18.293L6.41394 13H20.9999V11Z",fill:"currentColor"}})])]),e._v(" "),i("div",{staticClass:"title"},[e._v("\n                "+e._s(e.selected[e.textKey])+"\n            ")])]):e._e(),e._v(" "),i("div",{staticClass:"checkbox--items"},[e.selected?i("div",{staticClass:"checkbox--filter--item",on:{click:function(t){return e.input(e.selected,!0)}}},[i("span",[e._v("Tous")]),e._v(" "),i("span",{staticClass:"fake-checkbox",class:{selected:e.isActive(e.selected)}})]):e._e(),e._v(" "),e._l(e.children,(function(t,s){return i("checkbox-filter-item",{key:"child-"+s,attrs:{item:t,"is-active":e.isActive(t),"is-nested":e.isNested(t),"value-key":e.valueKey,"text-key":e.textKey},on:{select:e.select,input:e.input},scopedSlots:e._u([{key:"display",fn:function(t){var s=t.item;return[e._t("display",[i("span",[e._v(e._s(s[e.textKey]))])],null,{item:s})]}}],null,!0)})}))],2)]),e._v(" "),e.multiple?e._l(e.value||[],(function(t,s){return i("input",{key:s,attrs:{type:"hidden",name:e.name+"[]",id:e.name},domProps:{value:t[e.valueKey]}})})):i("input",{attrs:{type:"hidden",name:e.name,id:e.name},domProps:{value:e.value?e.value[e.valueKey]:null}})],2)}),[],!1,null,"2d1259f8",null);t.default=a.exports}}]);