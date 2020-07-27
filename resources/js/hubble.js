window.Vue = require('vue');
window.axios = require('axios');
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
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = '/api/hubble'

// window.Vue.prototype.$old = window.old;
// window.Vue.prototype.$hasFormError = window.hasFormError;
// window.Vue.prototype.$getFormErrors = window.getFormErrors;
window.Vue.prototype.$axios = window.axios
window.Vue.prototype.$disableScroll = disableScroll
window.Vue.prototype.$isMobile = window.isMobile
window.Vue.prototype.$csrf = window.x_csrf_token
window.Vue.prototype.$auth_user = window.auth_user
window.Vue.prototype.$t = window.trans;
// Vue.component('file-input', require('./components/FileInput.vue').default)
// Vue.component('v-input', require('./components/VInput.vue').default)
// Vue.component('v-checkbox', require('./components/VCheckbox.vue').default)
// Vue.component('v-textarea', require('./components/VTextarea.vue').default)
Vue.component('hubble-index', () => import(/* webpackChunkName: "hubble-index"*/ /* webpackPrefetch: true */ "./hubble-index.vue"))
Vue.component('hubble-edit', () => import(/* webpackChunkName: "hubble-edit"*/ /* webpackPrefetch: true */ "./hubble-edit.vue"))
Vue.component('hubble-details', () => import(/* webpackChunkName: "hubble-details"*/ /* webpackPrefetch: true */ "./hubble-details.vue"))
Vue.component('hubble-create', () => import(/* webpackChunkName: "hubble-create"*/ /* webpackPrefetch: true */ "./hubble-create.vue"))
Vue.component('hubble-checkbox-filter', () => import(/* webpackChunkName: "hubble-checkbox-filter"*/ /* webpackPrefetch: true */ "./components/filters/checkbox-filter.vue"))
// Vue.component(`value-chart`, () => import(/* webpackChunkName: "[request]" */ /* webpackPrefetch: true */`./components/admin/components/charts/value-chart.vue`))
// Vue.component(`datetime-x-axis-chart`, () => import(/* webpackChunkName: "[request]" */ /* webpackPrefetch: true */`./components/admin/components/charts/datetime-x-axis-chart.vue`))

const mods = {
    text: ['edit', 'show', 'index'],
    file: ['edit', 'show', 'index'],
    image: ['edit', 'show', 'index'],
    'select': ['edit'],
    'datetime': ['edit'],
    'boolean': ['show', 'edit'],
    'textarea': ['edit'],
    'color-picker': ['show']
};

Object.keys(mods).forEach(key => {
    mods[key].forEach(mod => {
        Vue.component(`${mod}-${key}-field`, () => import(/* webpackChunkName: "[request]"*/ /* webpackPrefetch: true */`./components/fields/${key}/${mod}-${key}-field.vue`))
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

const app = new Vue({
    el: '#hubble',
    data: {},
    components: {}
});
