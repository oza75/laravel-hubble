export const ActionMixin = {
    data: () => ({
        running: false,
    }),
    props: {
        action: {type: Object, required: true},
        selected: {required: true},
    },
    methods: {
        close() {
            this.$emit('close')
        },
        run() {
            this.running = false;
            return this.$axios.post(this.action.url, {items: this.selected})
                .then(res => {
                    this.ran();
                }).finally(_ => {
                    this.running = false;
                })
        },
        ran() {
            this.$emit('ran');
        }
    }
}
