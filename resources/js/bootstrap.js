import * as rules from "./rules";
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = '/api/hubble';

function handlePopovers() {
    let items = [].slice.call(document.querySelectorAll('.popover'))
    items.forEach((item, k) => {
        item.addEventListener('click', function (event) {
            let element = document.getElementById('popover-' + k)
            let opened = item.getAttribute('data-popover-opened') || false;
            let clickOutside = function (event) {
                let elem = document.getElementById('popover-' + k)
                if (!elem.contains(event.target)) {
                    elem.classList.remove('opened');
                    item.removeAttribute('data-popover-opened');
                    window.removeEventListener('click', clickOutside)
                }
            }
            if (element) {
                if (opened) {
                    element.classList.remove('opened');
                    item.removeAttribute('data-popover-opened');
                } else {
                    element.classList.add('opened');
                    item.setAttribute('data-popover-opened', true);
                    setTimeout(() => {
                        window.addEventListener('click', clickOutside)
                    }, 20)
                }
            } else {
                let rect = item.getBoundingClientRect();
                let element = document.createElement('div')
                element.setAttribute('class', item.getAttribute('data-popover--classes'))
                element.classList.add('popover--wrapper', 'opened')
                element.setAttribute('id', 'popover-' + k)
                element.innerHTML = item.querySelector('.popover--content').outerHTML
                document.body.appendChild(element)
                let content = element.querySelector('.popover--content')
                let contentRect = content.getBoundingClientRect()
                element.style.top = rect.top - contentRect.height - 10 + 'px'
                element.style.left = rect.x + 'px'
                setTimeout(() => {
                    window.addEventListener('click', clickOutside)
                }, 20)
            }
        })
    })
}

document.addEventListener('DOMContentLoaded',  () => {
    handlePopovers();
    window.hubble_rules = rules;
    document.addEventListener('turbolinks:load', () => {
        handlePopovers();
        window.hubble_rules = rules;
    });
})

