export const ActionMixin = {
    data: () => ({
        running: false,
    }),
    props: {
        action: {type: Object, required: true},
        selected: {type: Array, required: true},
        resource: {type: Object, required: true},
    },
    computed: {
        selectedIds() {
            return this.selected.map(it => it[this.resource.key || 'id']);
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        run() {
            this.running = false;
            return this.$axios.post(this.action.url, {items: this.selectedIds})
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
