window.Vue = require('vue');
import TurbolinksAdapter from 'vue-turbolinks';
require('./bootstrap.js')
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
let disableScroll = {
    on: function () {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        document.body.style.overflowY = 'none';
        document.body.style.left = '0';
        document.body.style.bottom = '0';
        document.body.style.right = '15px';
    }, off: function () {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.overflowY = '';
        document.body.style.right = '';
        document.body.style.left = '';
        document.body.style.bottom = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        document.body.style.top = '';
    }
}
window.disableScroll = disableScroll

// window.Vue.prototype.$old = window.old;
// window.Vue.prototype.$hasFormError = window.hasFormError;
// window.Vue.prototype.$getFormErrors = window.getFormErrors;
window.Vue.prototype.$axios = window.axios
window.Vue.prototype.$disableScroll = disableScroll
window.Vue.prototype.$isMobile = window.isMobile
window.Vue.prototype.$csrf = window.x_csrf_token
window.Vue.prototype.$auth_user = window.auth_user
window.Vue.prototype.$t = window.trans;
window.Vue.prototype.$formErrors = window.getFormErrors;
window.Vue.prototype.$hasFormErrors = window.hasFormErrors;
window.Vue.prototype.$old = window.old;
window.Vue.use(TurbolinksAdapter)

// Vue.component('file-input', require('./components/FileInput.vue').default)
// Vue.component('v-input', require('./components/VInput.vue').default)
// Vue.component('v-checkbox', require('./components/VCheckbox.vue').default)
// Vue.component('v-textarea', require('./components/VTextarea.vue').default)
Vue.component('hubble-index', () => import(/* webpackChunkName: "hubble-index"*/ /* webpackPrefetch: true */ "./hubble-index.vue"))
Vue.component('hubble-edit', () => import(/* webpackChunkName: "hubble-edit"*/ /* webpackPrefetch: true */ "./hubble-edit.vue"))
Vue.component('hubble-details', () => import(/* webpackChunkName: "hubble-details"*/ /* webpackPrefetch: true */ "./hubble-details.vue"))
Vue.component('hubble-create', () => import(/* webpackChunkName: "hubble-create"*/ /* webpackPrefetch: true */ "./hubble-create.vue"))
Vue.component('hubble-checkbox-filter', () => import(/* webpackChunkName: "hubble-checkbox-filter"*/ /* webpackPrefetch: true */ "./components/filters/checkbox-filter.vue"))
Vue.component('edit-image-field', () => import(/* webpackChunkName: "edit-image-field" */ /* webpackPrefetch: true */"./components/fields/image/edit-image-field.vue"))
Vue.component('table-button', () => import(/* webpackChunkName: "table-button" */ /* webpackPrefetch: true */"./components/table-buttons/t-button.vue"))
Vue.component('export-button', () => import(/* webpackChunkName: "export-button" */ /* webpackPrefetch: true */"./components/table-buttons/export-button.vue"))
Vue.component('table-button-attach', () => import(/* webpackChunkName: "table-button-attach" */ /* webpackPrefetch: true */"./components/table-buttons/t-attach.vue"))
Vue.component('table-modal', () => import(/* webpackChunkName: "table-modal" */ /* webpackPrefetch: true */"./components/table-buttons/table-modal.vue"))
Vue.component('hubble-panel', () => import(/* webpackChunkName: "hubble-panel" */ /* webpackPrefetch: true */"./hubble-panel.vue"))
Vue.component('hubble-form', () => import(/* webpackChunkName: "hubble-panel" */ /* webpackPrefetch: true */"./components/hubble-form.vue"))
Vue.component('v-modal', () => import(/* webpackChunkName: "hubble-v-modal" */ /* webpackPrefetch: true */"./components/v-modal.vue"));
Vue.component('confirm-action', () => import(/* webpackChunkName: "hubble-confirm-action" */ /* webpackPrefetch: true */"./components/actions/confirm-action.vue"));
Vue.component('file-input', require("./components/fields/image/FileInput.vue").default)
Vue.component('input-errors', require("./components/fields/input-errors.vue").default)

const mods = {
    text: ['edit', 'show', 'index'],
    file: ['edit', 'show', 'index'],
    image: ['index', 'edit', 'show'],
    'select': ['edit'],
    'datetime': ['edit'],
    'boolean': ['show', 'edit'],
    'textarea': ['edit'],
    'color-picker': ['show'],
};

Object.keys(mods).forEach(key => {
    mods[key].forEach(mod => {
        Vue.component(`${mod}-${key}-field`, () => import(/* webpackChunkName: "[request]" */ /* webpackPrefetch: true */`./components/fields/${key}/${mod}-${key}-field.vue`))
    })
})

// const charts = ['value-chart'];
//
// charts.forEach(chart => {
//     Vue.component(`${chart}`, () => import(/* webpackChunkName: "[request]"*/ /* webpackPrefetch: true */`./components/admin/components/charts/${chart}.vue`))
// })
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

document.addEventListener('turbolinks:load', () => {
    const app = new Vue({
        el: '#hubble',
        data: {},
        components: {}
    });
});
