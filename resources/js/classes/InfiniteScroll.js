export default class InfiniteScroll {
    constructor(listener, options) {
        this.listener = listener
        this.options = Object.assign({threshold: 400, element: document.documentElement}, options)
        this.handler = this.handlerFunc.bind(this);
        this.observe()
    }
    handlerFunc (event) {
        let elem = this.options.element
        let oldHeight = parseInt(elem.getAttribute('data-infinite-height') || 0)
        let height = elem.scrollHeight - this.options.threshold;
        if (height > oldHeight && elem.scrollTop + elem.clientHeight >= height) {
            this.listener()
            elem.setAttribute('data-infinite-height', height)
        }
    }

    observe() {
        let wrapper = this.options.element.isEqualNode(document.documentElement) ? window : this.options.element
        wrapper.addEventListener('scroll', this.handler)
    }
}
