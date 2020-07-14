export default class ClickOutside {
    constructor(element, handler) {
        this.element = element;
        this.handler = handler;
        this.handle = this.handle.bind(this);

        document.addEventListener('click', this.handle);
    }

    handle(event) {
        if (!this.element.contains(event.target)) {
            this.handler();
            document.removeEventListener('click', this.handle)
        }
    }
}
